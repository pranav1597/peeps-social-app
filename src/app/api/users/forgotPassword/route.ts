import  {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModels.js'
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/helpers/mailer'


connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email} = reqBody

        console.log(reqBody)

        if(!email) {
            return NextResponse.json({error: "Missing Credentials"}, {status: 400})
        }

        const user = await User.findOne({email})

        if(!user) {
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        try {
            await sendEmail({email, emailType: "RESET", userId: user._id})
            return NextResponse.json({message: "Email sent successfully"}, {status: 200})
        } catch (error: any) {
            return NextResponse.json({error: error.message}, {status: 500})
        }

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}