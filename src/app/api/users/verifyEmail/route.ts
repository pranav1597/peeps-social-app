import { connect } from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from 'next/server';
import User from "@/models/userModels.js";


connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log("token ", token)

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        console.log("user ", user)

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        const updatedUser = await user.save()

        console.log("updatedUser ", updatedUser)

        return NextResponse.json({message: "Email verified successfully", success: true}, {status: 200})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
        
    }
}