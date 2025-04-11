import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt"]

        if (!token) return res.status(401).json({ success: false, message: "Unauthorized - No token found" })

        const isValidToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!isValidToken) return res.status(401).json({ success: false, message: "Unauthorized - Invalid token" })

        const user = await User.findById(isValidToken.userId).select("-password")

        if (!user) return res.status(404).json({ success: false, message: "No user found" })

        req.user = user

        next()
    } catch (error) {
        console.log("Error in protectRoute middleware",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}