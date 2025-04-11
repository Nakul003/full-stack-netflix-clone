import mongoose from "mongoose";

export const connectDB = async(req,res) => {
    try {
       let conn = await mongoose.connect(process.env.MONGO_URI);
       console.log(`Connected with MongoDB successfully:${conn.connection.host}`);
    } catch (error) {
        console.log("Unable to connect with MongoDB",error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}