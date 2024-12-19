import { User } from '../models/userModel.js'

const generateAccessTokenUtils = async (userId)=>{
    try{
        const user = await User.findById(userId)
        const AccessToken = user.generateAccessToken()
        return AccessToken
    }catch(error){
        return false
    }
}
const generateRefreshTokenUtils = async (userId)=>{
    try{
        const user = await User.findById(userId)
        const RefreshToken = user.generateRefreshToken()
        return RefreshToken
    }catch(error){
        return false
    }
}

export {generateAccessTokenUtils , generateRefreshTokenUtils}