import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import User from "../modals/signupModel/signupModal.js";
import Details from "../modals/userDetails/user.details.js";
// import { verifytoken } from "../auth/auth.js";
dotenv.config();

export let createUser = async (req, res)=>{
    let {name, age, email, password} = req.body;
    try {
        let isExist = await User.findOne({email:email});
        if(isExist){
            return res.status(403).json({msg:"User already exist", resp:false});
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        let newUser = new User({
            name,
            age,
            email,
            password:hashedPassword
        })

        await newUser.save();

        return res.status(201).json({msg:"success", resp:true});
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({msg:"Server error", resp:false});
    }
}

export let findUser = async (req, res)=>{
    let {email, password} = req.body;
    try {
        let isExist = await User.findOne({email:email});
        if(!isExist){
            return res.status(404).json({msg:"user does not exist", resp:false});
        }
        let checkPass = await bcrypt.compare(password, isExist.password);
        if(!checkPass){
            return res.status(400).json({msg:"username or password is incorrect", resp:false});
        }
        let genToken = await jwt.sign({id:isExist._id}, process.env.secret_key);
        return res.status(200).json({msg:"success", resp:true, token:genToken, id:isExist._id});
    
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({msg:"Server error", resp:false});
    }
}
export let updateUserDetails = async (req, res)=>{
    try {
        let {userId, age, dob, mobile, gender} = req.body;
        let isExist = await User.findById(userId);
        // console.log(isExist)
        if(!isExist){
            return res.status(404).json({msg:"user does not exist", resp:false});
        }
        let updateDetails = await Details.updateOne(
            { userId: userId },
            { $set: { age, dob, mobile, gender } }
        );

        return res.status(200).json({ msg: "Success", resp: true });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({msg:"Server error", resp:false});
    }
}

export let getDetails = async (req, res)=>{
    try {
        let {userId} = req.params;
        let data = await Details.findOne({userId:userId});
        if(!data){
            return res.status(400).json({msg:"user data not available", resp:false});
        }
        return res.status(200).json({msg:data, resp:true});
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({msg:"Server error", resp:false});
    }
}