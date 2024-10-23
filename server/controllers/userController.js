import {User} from '../models/userModel.js'
import {Bookmark} from '../models/bookmarkModel.js'
import {Question} from '../models/questionModel.js'
import {Notification} from '../models/notificationModel.js'

const getProfile = async(req ,res)=>{
    try {
        const userId = req.user._id
        const user  = await User.findById(userId).select('-password -refreshToken')
        if(!user) return res.status(404).json({error:true, message:'User not found'})
        return res.status(201).json({error:false,message:'Success',data:user})
    } catch (error) {
        return res.status(500).json({error:true,message:'Some Internal Error Occured'})
    }
}

const getBookmarks = async (req, res)=>{
    try {
        const userId = req.user._id
        const bookmarks = await Bookmark.find({userId:userId}).sort({createdAt: -1}).populate('questionId').exec()
        return res.status(201).json({error:false , message:'Success' , data:bookmarks || []})
    } catch (error) {
        return res.status(500).json({error:true,message:'Some Internal Error Occured'})
    }
}

const getQuestions = async (req, res)=>{
    try {
        const userId = req.user._id
        const questions = await Question.find({userId:userId}).sort({createdAt: -1}).exec()
        return res.status(201).json({error:false , message:'Success' , data:questions || []})
    } catch (error) {
        return res.status(500).json({error:true,message:'Some Internal Error Occured'})
    }
}

const editProfile = async(req , res)=>{
    try{
        const userId = req.user._id
        const {techStack,language} = req.body
       
        const user = await User.findById(userId)
        
        user.techStack=techStack
        user.language = language
        
        await user.save({validateBeforSave:false});
        return res.status(200).json({error:false,message:"Changes Saved!"})
    }catch(error){
        return res.status(505).json({error:true,message:"Internal Server Error Occured"})
    }
}

//post
const linkCodeforces = async (req , res)=>{
    try {
        const {cfId} = req.body
        const userId = req.user._id
        const user = await User.findById(userId)
        const url = `https://codeforces.com/api/user.rating?handle=${cfId}`
        const respone  = await fetch(url , {method:'GET'})
        const data = await respone.json()
        if(!data.result) return res.status(404).json({error:true , message:'User does not exist on CF'})
        //look into the case of unrated
        const cfRating = (data.result[(data.result).length - 1]).newRating
        user.codeForces = cfId
        user.cfRating = cfRating
        await user.save({validateBeforSave:false});
        return res.status(200).json({error:false,message:'Success'})
    } catch (error) {
        return res.status(505).json({error:true,message:"Internal Server Error Occured"})
    }
}


const updateCodeforces = async (req ,res)=>{
    /*on every refresh of the profile page, the a request to codeforces api is made. If the rating changes then
    it makes a put request to controller to update it on the database*/
    try {
        const {cfRating} = req.body
        const userId = req.user._id
        const user = await User.findById(userId)
        const url = `https://codeforces.com/api/user.rating?handle=${user.codeForces}`
        const respone  = await fetch(url , {method:'GET'})
        const data = await respone.json()
        if(!data.result) return res.status(404).json({error:true , message:'User does not exist on CF'})
        if((data.result[(data.result).length - 1]).newRating !== cfRating)
            return res.status(401).json({error:true , message:'Rating did not match'})
        user.codeForces = cfId
        user.cfRating = cfRating
        await user.save({validateBeforSave:false});
        return res.status(200).json({error:false,message:'Success'})
    } catch (error) {
        return res.status(505).json({error:true,message:"Internal Server Error Occured"})
    }
}


const deleteProfile = async(req, res)=>{
    try {
        const userId = req.user._id
        const {password} = req.body
        const user = await User.findById(userId)
        const passwordCheck=await user.isPasswordCorrect(password)
        if(!passwordCheck){
            mailUtil(user.email , "ALERT!!!Someone tried to make changes to your ZCoder Account with a incorrect Password!!")
            return res.status(401).json({error:true,message:"Incorrect Password"})
        }
        const deleteUser = await User.findByIdAndDelete(userId)
        if(!deleteUser) return res.status(500).json({error:true,message:'Account not deleted'})
        const deletedBookmarks =await Bookmark.findManyAndDelete({userId:userId})
        
        return res.status(200).json({error:false,message:'Account Deleted Successfully'})
    } catch (error) {
        return res.status(505).json({error:true,message:"Internal Server Error Occured"})
    }
}

const getProfileById = async()=>{}

const Logout = async()=>{
    try{
        const  userId = req.user._id;
        const user=await User.findById(userId)
        user.refreshToken = null
        await user.save({validateBeforSave:false})
        const options ={
            httpOnly:true,
            secure:process.env.DEV_STATE === 'production'
        }
        return  res.status(200).clearCookie('AccessToken' , options).clearCookie("RefreshToken",options)
        .json({
                "error":false,
                "message":"User Logged Out Successfully"
            })
    }catch(error){
        return  res.status(500).json({
            "error":true,
            "message":"Error in Server while logging Out the user"
        })
    }
}

const refreshToken = async()=>{
    try {
        const sentToken = req.cookie?.RefreshToken || req.headers['RefreshToken']?.replace("Bearer ", '')
        if(!sentToken) return res.status(401).json({error:true , message:'No Token'})

        const sentUser = jwt.verify(sentToken , process.env.REFRESH_TOKEN_SECRET)
        if(!sentUser) return res.status(401).json({error:true , message:'Invalid Token'})

        const user = await User.findById(sentUser._id)
        if(!user) return res.status(404).json({error:true , message:'No valid user found'})

        if(user?.refreshToken !== sentToken) return res.status(401).json({error:true , message:'Incorrect Tokens'})
        
        const AccessToken =  await generateAccessTokenUtils(user._id)
        const options={
            httpOnly:true,
            secure:process.env.DEV_STATE === 'production'
        }

        return res.status(200)
        .cookie("AccessToken" , AccessToken , options)
        .cookie("RefreshToken" , user.refreshToken , options)
        .json({
            "error":false,
            "message":"Refresh successfull"
        })
    } catch (error) {
        return res.status(500).json({
            "error":true,
            "message":error.message || "Server error occured"
        })
    }
}

const getNotifications = async()=>{
    try {
        const userId = req.user._id
        const notifications = await Notification.find({userId:userId}).sort({createdAt:-1}).exec()
        return res.status(400).json({error:false,message:'Success',data:notifications})
    } catch (error) {
        return res.status(500).json({error:true,message:'Some Internal Error Occured'})
    }
}

export {getProfile , editProfile , deleteProfile , getProfileById , Logout , refreshToken ,
     getNotifications , getBookmarks , getQuestions , linkCodeforces , updateCodeforces}