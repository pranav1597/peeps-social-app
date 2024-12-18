import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please add a username"],
        unique: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true,"Password is required"],
    },
    avatar: {
        type: String,
        required: [false,"Please add a photo"],
    },
    bio: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenExpiry: {
        type: Date,
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpiry: {
        type: Date,
    },
    
},
{
    timestamps: true
}
)


const User = mongoose.models.User || mongoose.model('User',userSchema)

export default User 