import bcrypt from "bcryptjs"
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";

export const signUp = async (req,res) =>{
    try {
        const  {email, password,userName,image} =req.body;
        if ( !userName || !email || !password) return res.status(400).json({success:false,message:"All fields are required"})

        const emailReqex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if(!emailReqex.test(email)) return res.status(400).json({success:false,message:"Email is invalid"})

        if (password.length < 6) return res.status(400).json({success:false,message:"Password must be atleast 6 characters"})

        const user = await User.findOne({ email });

        if (user) return res.status(400).json({success:false,message:"User already exist"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); 

        const newUser = new User({
            email,
            password:hashedPassword,
            userName,
            image
        })

        if (newUser) {
            
            generateToken(newUser._id,res)
            
            await newUser.save();

            res.status(201).json({
                success:true,
                user:{
                    _id:newUser._id,
                    email:newUser.email,
                    userName:newUser.userName,
                    image:newUser.image,
                    searchHistory:newUser.searchHistory
                }
            });
        }
    } catch (error) {
        console.log("Error in signUp controller",error);
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

export const logIn = async(req,res) =>{
    try {
        const {email, password} = req.body;

        if (!email || !password) return res.status(400).json({success:false,message:"All fields are required"});

        const user = await User.findOne({email});

        if (!user) return res.status(400).json({success:false,message:"Invalid Credentials"});

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) return res.status(400).json({success:false,message:"Invalid Credentials"});

        generateToken(user._id,res);

        res.status(200).json({
            success:true,
            _id:user._id,
            email:user.email
        })
    } catch (error) {
        console.log("Error in logIn controller",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export const logOut = (req,res) =>{
    try {
        res.clearCookie("jwt");
        res.status(200).json({success:true,message:"Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

export const authCheck = (req,res) => {
    try {
        res.status(200).json({success:true,user:req.user})
    } catch (error) {
        console.log("Error in authCheck controller",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}