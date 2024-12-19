const otpGenerate = ():number=>{
    try{
        const otp = Math.floor(Math.random()*(9999-1000+1)*1000)
        console.log(otp)
        return otp;
    }catch(error){
        console.log("Error is generating OTP")
        return 0;
    }
}

export default otpGenerate