const otpGenerate = ()=>{
    try{
        const otp = parseInt(crypto.randomBytes(4).toString('hex').slice( 0 , 4) , 16).toString().slice(0 , 4)
        console.log(otp)
        return otp;
        
    }catch(error){
        console.log("Error is generating OTP")
        return false;
    }
}

export default otpGenerate