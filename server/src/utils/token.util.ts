import { Users } from '../types.js'
import jwt from 'jsonwebtoken'


const generateAccessTokenUtils = (user:Users):string =>{
    const AccessToken = jwt.sign(
    {
        _id:user._id,
        username:user.username,
        email:user.email
    },
    process.env.ACCESS_TOKEN_SECRET||'56789',
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
    return AccessToken
}
const generateRefreshTokenUtils = (user:Users):string=>{
   const RefreshToken = jwt.sign(
    {
        _id:user._id
    },
    process.env.REFRESH_TOKEN_SECRET||`12345` ,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
   )
   return RefreshToken
}

export {generateAccessTokenUtils , generateRefreshTokenUtils}