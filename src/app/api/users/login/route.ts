import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import redisClient from "@/helpers/redis";


connect()

const maxAttempts = parseInt(process.env.MAX_ATTEMPTS!)
const lockTime = parseInt(process.env.LOCK_TIME!) * 60

export async function POST(request: NextRequest) {

  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log("Login request received for email:", email);

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }


    // Rate limiting key
    const rateLimitKey = `login_attempts:${email}`;
    console.log('ratelimitkey: ', rateLimitKey)

    const key = await redisClient.get(rateLimitKey)
    console.log("key ",key)



    // Check current login attempts
    const attempts = parseInt((await redisClient.get(rateLimitKey)) || "0", 10);
    console.log("Current login attempts:", attempts);

    if (attempts >= maxAttempts) {
      const ttl = await redisClient.ttl(rateLimitKey);
      console.log("ttl ", ttl)
      return NextResponse.json(
        {
          error: `Too many login attempts. Please try again later.`,
        },
        { status: 429 }
      );
    }

    // Validate password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      // Increment failed login attempts
      const currentAttempts = await redisClient.incr(rateLimitKey);
      if (currentAttempts === 1) {
        await redisClient.expire(rateLimitKey, lockTime);
      }
      console.log(
        `Invalid password. Attempt ${currentAttempts}/${maxAttempts}.`
      );
      return NextResponse.json({ error: "Invalid password." }, { status: 400 });
    }

    // Reset login attempts on success
    console.log("Successful login. Resetting login attempts.");
    await redisClient.del(rateLimitKey);

    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    // Set response and token cookie
    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error:any) {
    console.error("Error in login handler:", error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}



