import {User} from '../models/userModel.js'
import otpGenerate from '../utils/otpUtil.js';
import mailUtil from '../utils/emailUtil.js';
import { RedisDel, RedisGet, RedisSet} from '../config/redis_config.js'

const Login = async(req ,res)=>{
    const username=req.body.username;
    const password=req.body.password;
  try{
    const userExistenceCheck=await User.findOne( {username:username} );
    if(!userExistenceCheck) return res.status(404).json({error:true , message:'User not found'})
       
    const user=userExistenceCheck;
    const passwordCheck=await user.isPasswordCorrect(password)
    if(!passwordCheck){
        mailUtil(user.email , "ALERT!!!Someone tried to Enter in yor StackUnderflow Account with a incorrect or invalid Password!!")
        return res.status(401).json({error:true , message:'Wrong Password'})
    }
    const AccessToken = await generateAccessTokenUtils(user._id);
    const RefreshToken = await generateRefreshTokenUtils(user._id)
    
    if(!AccessToken || !RefreshToken) return res.status(501).json({error:true , message:'Error in Generating Bearer Tokens'})
       
    const loggedInUser=await User.findById(user._id).select(" -password -refreshToken")
    const options={
        httpOnly:true,
        secure:process.env.DEV_STATE === 'production'
    }
    loggedInUser.refreshToken=RefreshToken
    loggedInUser.save({validateBeforeSave:false})
    return res.status(200).cookie("AccessToken", AccessToken, options)
    .cookie("RefreshToken" , RefreshToken , options)
    .json({
        "error":false,
        "loggedInUser":loggedInUser,
        "message":"Succesfull Login"
    });
  }catch(error){
    return res.status(500).json({error:true , message:'Internal Error Occured'})
  }
}

const Signup = async ()=>{
    try {
        const {username , email , password , Confpassword} = req.body
        
        if(email === undefined || username === undefined || password === undefined || Confpassword === undefined)
            return res.status().json({error:400 , message:'all required fields are not sent' })
        
        if(password !== Confpassword)
            return res.status().json({error:400 , message:'Confirm password must match with Password' })

        if(password.length < 8)
            return res.status().json({error:400 , message:'Password must have at least 8 characters' })
           
        const userExistenceCheck = await User.findOne({$or:[{email:email} , {username:username}]})
        if(!(userExistenceCheck===null) && (userExistenceCheck.email==email || userExistenceCheck.username==username))
            return res.status().json({error:400 , message:'User with same Email or username already exists' })

        const otpCheck = await RedisGet({key:email})
        if(!otpCheck) return res.status(400).json({error:true , message:'You seem to have made an OTP request in the last 5 minutes. Wait for Refresh'})
            
        const otp = otpGenerate()
        if(!otp) return res.status(500).json({error:true , message:'Internal Error Occured'})
        await RedisSet({key:email , value:otp , ex:5})

        const newUser = await User.create({username , email , password })
        if(newUser === null) 
            return res.status(500).json({error:true , message:'New User not Created due to Server Error'})
        mailUtil(email , `OTP for email verification at CodeHub : ${otp}. It is valid for next 5 minutes. Refrain from making any otp request next 5 minutes`);  

        return res.status(200).json({error:false , message:'OTP sent to your Email Address for verification. Validate in 5 minutes'})

    } catch (error) {
        return res.status(500)
        .json({
            "error":true,
            "message":'Some Error Occurred'
        })
    }
}

const verifyEmail = async()=>{
    try {
        const {otp , email} = req.body
    
        const otpCheck = await RedisGet({key:email})
        if(!otpCheck) return res.status(400).json({error:true , message:'OTP request either outdated or not made'})
        
        if(otp !== otpCheck){
            RedisDel({key:email})
            await User.findAndDeleteOne({email:email})
            return res.status(401).json({error:true , message:'Wrong OTP! SignUp failed'})
        }
    
        RedisDel({key:email})
        const user = User.find({email:email})
        user.verified = true
        await user.save({validateBeforeSave:false})
        mailUtil(email , "Welcome to CodeHub! SignUp sucessfull. Go and Log In");
    
        return res.status(200)
        .json({
            "error":false,
            "message":"Succesfully created account. GO LOG IN!!!!"
        })
    } catch (error) {
        return res.status(500)
        .json({
            "error":true,
            "message":'Some Error Occurred'
        })
    }
}

const getOtp = async()=>{
   try {
     const {email} = req.body
     
     const otp = otpGenerate()
     if(!otp) return res.status(500).json({error:true , message:'Internal Error Occured'})
     await RedisSet({key:email , value:otp , ex:5})
     mailUtil(email , `OTP for email verification at CodeHub : ${otp}. It is valid for next 5 minutes. Refrain from making any otp request next 5 minutes`);  
 
     return res.status(200).json({error:false, user:email ,message:`OTP sent to your Email-${email.slice(0,3)}*****. Validate in 5 minutes`})
   } catch (error) {
        return res.status(500)
        .json({
            "error":true,
            "message":'Some Error Occurred'
        })
   }
}

const postOtp = async()=>{
        try {
            const {otp , user} = req.body
            const otpCheck = await RedisGet({key:user})
            if(!otpCheck) return res.status(400).json({error:true , message:'OTP request either outdated or not made'})
            
            if(otp !== otpCheck){
                await RedisDel({key:user})
                mailUtil(user , "Wrong OTP! Try to Reset Password after 5minutes");
                return res.status(401).json({error:true , message:'Wrong OTP!Try to Reset Password after 5minutes'})
            }
        
            await RedisDel({key:user})
            await RedisSet({key:user, value:true , ex:15})
            return res.status(200).json({
                error:false,
                message:'OTP correct. Enter a new Password in 15minutes',
                user:user
            })
        }catch (error) {
            return res.status(500).json({
            "error":true,
            "message":'Some Error Occurred'
            })
        }
}

const resetPassword = async()=>{
    try {
        const {newPassword , user} = req.body
        const passwordAllowance = await RedisGet({key:user})
        if(!passwordAllowance) return res.status(401).json({error:true , message:'Not Allowed'})
        const userAcc = await User.find({email:user})
        if(!userAcc) return res.status(404).json({error:true , message:'User not found'})
        userAcc.password = newPassword
        await user.save({validateBeforeSave:false})
        await RedisDel({key:user})
        return res.status(200).json({error:false, message:'Password Changed Successfully'})
    } catch (error) {
        return res.status(500).json({
            "error":true,
            "message":'Some Error Occurred'
            })
    }
}

export {Login , Signup , verifyEmail , getOtp , postOtp , resetPassword}