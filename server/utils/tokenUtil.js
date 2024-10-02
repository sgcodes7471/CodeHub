import { User } from '../models/userModel.js'

const generateAccessTokenUtils = async (userID)=>{
    try{
        const user = await User.findById(userID)
        const AccessToken = user.generateAccessToken()
        return AccessToken
    }catch(error){
        return false
    }
}
const generateRefreshTokenUtils = async (userID)=>{
    try{
        const user = await User.findById(userID)
        const RefreshToken = user.generateRefreshToken()
        return RefreshToken
    }catch(error){
        return false
    }
}

export {generateAccessTokenUtils , generateRefreshTokenUtils}