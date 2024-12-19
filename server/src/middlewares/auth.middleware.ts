import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
const authMiddleware = async ( req:Request, res:Response, next:NextFunction)=>{
    try {
        const authToken = req.headers['AccessToken']?.toString().replace("Bearer " , '')
        if(!authToken) throw new Error("No Token")
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const info:JwtPayload|string = jwt.verify(authToken , secret || '56789') 
        if(!info) throw new Error("Validation failed")
        req.user = typeof info==='string'?JSON.parse(info):info;
        next()

    } catch (error) {
        return res.status(500).json({message:'Something went wrong'})
    }
}

export default authMiddleware
