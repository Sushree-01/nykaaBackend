const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
require("dotenv").config()
const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,created_at,updated_at}=req.body;
    try{
        let userExist=await UserModel.findOne({email})
        if(userExist){
            res.status(200).json({msg:"User already exists, please login"})
        }else{
            const newUser=new UserModel({
                name,
                email,
                gender,
                password,
                created_at,
                updated_at
            });
            await newUser.save();
            res.status(200).json({msg:"New user registered"});
        }
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err, result)=>{
                if(result){
                    let token=jwt.sign({userID:user._id,user:user.name},process.env.SECRET_KEY)
                    res.status(200).json({msg:"Logged In!",token})
                }else{
                    res.status(401).json({msg:"Wrong Credentials"})
                }
            })
        }else{
            res.status(404).json({msg:"User does not exist"})
        }
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

module.exports={
    userRouter
};

