import {User} from '../models/userModel.js'
import mailUtil from "../utils/mail.util";
import { generateAccessTokenUtils,generateRefreshTokenUtils } from "../utils/token.util";
import otpGenerate from '../utils/otp.util';
import { RedisGet, RedisDel , RedisSet } from '../config/redis.config';
import { Request,Response } from 'express';
import jwt,{JwtPayload} from 'jsonwebtoken';

export const Login=async(req:Request , res:Response)=> {
    try {
        const {email , password}:{email:string , password:string} = req.body;
        if(email.trim().includes('@')) res.status(400).json({message:'Email invalid'});
        const userExistenceCheck=await User.findOne( {email:email} );
        if(!userExistenceCheck) throw new Error('User not found');
           
        const user=userExistenceCheck;
        const passwordCheck=await user.isPasswordCorrect(password)
        if(!passwordCheck){
            mailUtil(user.email , "ALERT!!!Someone tried to Enter in yor StackUnderflow Account with a incorrect or invalid Password!!");
            throw new Error('Wrong Password')
        }
        const AccessToken = generateAccessTokenUtils(user._id);
        const RefreshToken = generateRefreshTokenUtils(user._id);
        
        if(!AccessToken || !RefreshToken) throw new Error('Error in Generating Bearer Tokens')
           
        const loggedInUser=await User.findById(user._id).select(" -password -refreshToken");
        const options={
            httpOnly:true,
            secure:process.env.DEV_STATE === 'production'
        }
        loggedInUser.refreshToken=RefreshToken
        loggedInUser.save({validateBeforeSave:false})
        res.status(200).cookie("AccessToken", AccessToken, options)
        .cookie("RefreshToken" , RefreshToken , options)
        .json({
            loggedInUser:loggedInUser,
            message:"Succesfull Login"
        }); 
    } catch (error) {
        res.status(500).json({message:'Server Error Occured'})
    }
}

export const  SignUp=async(req:Request , res:Response)=> {
    try {
        const {username , email , password} = req.body
        if(email === undefined || username === undefined || password === undefined)
            throw new Error('all required fields are not sent')
        
        if(password.length < 8) throw new Error('Password must have at least 8 characters')
           
        const userExistenceCheck = await User.findOne({$or:[{email:email} , {username:username}]})
        if(!(userExistenceCheck===null) && (userExistenceCheck.email==email || userExistenceCheck.username==username))
            throw new Error('User with same Email or username already exists')

        const otpCheck = await RedisGet({key:email})
        if(!otpCheck) throw new Error('You seem to have made an OTP request in the last 5 minutes. Wait for Refresh')
            
        const otp = otpGenerate()
        if(otp===0) throw new Error('Internal Error Occured');
        await RedisSet({key:email , value:otp , ex:5})

        const newUser = await User.create({username , email , password })
        if(newUser === null) throw new Error('New User not Created due to Server Error')
        mailUtil(email , `OTP for email verification at CodeHub : ${otp}. It is valid for next 5 minutes. Refrain from making any otp request in the next 5 minutes`);  

        res.status(200).json({message:'OTP sent to your Email Address for verification. Validate in 5 minutes'})

    } catch (error) {
        res.status(500).json({message:'Some Error Occurred' })
    }
}

export const verifyEmail=async(req:Request , res:Response)=>{
    try {
        const {otp , email} = req.body
    
        const otpCheck = await RedisGet({key:email})
        if(!otpCheck) throw new Error('OTP request either outdated or not made')
        
        if(otp !== otpCheck){
            RedisDel({key:email})
            await User.findAndDeleteOne({email:email})
            throw new Error('Wrong OTP! SignUp failed')
        }
    
        RedisDel({key:email})
        const user = User.find({email:email})
        user.verified = true
        await user.save({validateBeforeSave:false})
    
        res.status(200).json({message:"Succesfully created account. GO LOG IN!!!!"})
    } catch (error) {
        res.status(500).json({message:'Some Error Occurred'})
    }
}

export const GetOtp=async(req:Request , res:Response)=> {
   try {
     const {email} = req.body
     const otpCheck = await RedisGet({key:email})
     if(!otpCheck) throw new Error('You seem to have made an OTP request in the last 5 minutes. Wait for Refresh')
       
     const otp = otpGenerate()
     if(otp===0) throw new Error('Internal Error Occured')
     await RedisSet({key:email , value:otp , ex:5})
     mailUtil(email , `OTP for email verification at CodeHub : ${otp}. It is valid for next 5 minutes. Refrain from making any otp request next 5 minutes`);  
 
     res.status(200).json({user:email ,message:`OTP sent to your Email-${email.slice(0,3)}*****. Validate in 5 minutes`})
   } catch (error) {
    res.status(500).json({message:'Some Error Occurred'})
   }
}

export const PostOtp=async(req:Request , res:Response)=>{
    try {
        const {otp , email} = req.body
        const otpCheck = await RedisGet({key:email})
        if(!otpCheck) throw new Error('OTP request either outdated or not made')
                
        if(otp !== otpCheck){
            await RedisDel({key:email})
            mailUtil(email , "Wrong OTP! Try to Reset Password after 5minutes");
            throw new Error('Wrong OTP!Try to Reset Password after 5minutes')
        }
        await RedisDel({key:email})
        await RedisSet({key:email, value:'true' , ex:15})
        res.status(200).json({message:'OTP correct. Enter a new Password in 15minutes',email:email})
    } catch (error) {
        res.status(500).json({message:'Some Error Occurred'})
    }
}


export const ResetPassword=async(req:Request , res:Response)=> {
   try {
     const {newPassword , email} = req.body
     const passwordAllowance = await RedisGet({key:email})
     if(passwordAllowance!=='true') throw new Error('Not Allowed to change password')
     const userAcc = await User.find({email:email})
     if(!userAcc) throw new Error('User not found')
     userAcc.password = newPassword
     await userAcc.save({validateBeforeSave:false})
     await RedisDel({key:email})
     res.status(200).json({message:'Password Changed Successfully'})
   } catch (error) {
    res.status(500).json({message:'Some Error Occurred'})
   }
}

export const RefreshToken=async(req:Request,res:Response)=>{
    try {
        const sentToken:string = req.headers['RefreshToken']?.toString().slice(0,7) || '';
        if(sentToken.length===0) throw new Error('No Token')
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const sentUser:JwtPayload|string = jwt.verify(sentToken , secret || '56789') 
        if(!sentUser) throw new Error('Invalid Token')
        const user= typeof sentUser === 'string'?null:await User.findById(sentUser._id)
        if(!user) throw new Error('No valid user found')
    
        if(user?.refreshToken !== sentToken) throw new Error('Incorrect Tokens')
            
        const AccessToken = generateAccessTokenUtils(user?._id||'')
        const options={
            httpOnly:true,
            secure:process.env.DEV_STATE === 'production'
        }
    
        res.status(200)
        .cookie("AccessToken" , AccessToken , options)
        .cookie("RefreshToken" , user?.refreshToken , options)
        .json({message:"Refresh successfull"})
    } catch (error) {
        res.status(500).json({message:'Some Error Occured'})
    }
}