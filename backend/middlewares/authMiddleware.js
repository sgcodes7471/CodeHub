import jwt from 'jsonwebtoken'
const authMiddleware = async ( req, res, next)=>{
    try {
        const authToken = req.cookies?.AccessToken || req.headers['AccessToken']?.replace("Bearer " , '')
        if(!authToken)
            throw new Error(401 , "No Token")
        const info = jwt.verify(authToken , process.env.ACCESS_TOKEN_SECRET)
        if(!info) 
            throw new Error(401, "Validation failed")
        req.user = info
        next()

    } catch (error) {
        return res.status(500).render('error',{error:true,message:'Something went wrong'})
    }
}

export default authMiddleware
