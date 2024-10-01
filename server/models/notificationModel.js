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
                "Course",
                "Chat",
                "General",
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

export const Upvote = mongoose.model("Notification" , notificationSchema);