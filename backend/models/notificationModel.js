import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        field:{
            type:String,
            enum:[
                "ALL" , "IMP" , "GEN" , "CHAT" , "COURSE"
            ]
        },
        text:{
            type:String,
            required:true,
        },
        time:{
            type:Date,
            required:true
        }
    },{
        timestamps:true
    }
)

export const Notification = mongoose.model("Notification" , notificationSchema);