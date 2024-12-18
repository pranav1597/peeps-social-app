import mongoose from "mongoose";


export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URL!)
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("Connected to database Mongodb")
        })

        connection.on("error", (err) => {
            console.log("Error connecting to database", err)
            process.exit(1)
        })

    } catch (error) {
        console.log("Error connecting to database", error)
    }
}