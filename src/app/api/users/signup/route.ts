import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log("reqBody ", reqBody)

        const user = await User.findOne({email})
        console.log("user from db ", user)

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt  = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        console.log("Saved User ", savedUser)

        // send user email verification

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        console.log("Signup error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

