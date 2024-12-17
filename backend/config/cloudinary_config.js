import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name:'',
    api_kry:'',
    api_secret:''
})

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        console.log(response)
        console.log('file uploaded on cloudinary' , response.url)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log('file not uploaded on Cloudinary')
        return null
    }
}

export default uploadOnCloudinary