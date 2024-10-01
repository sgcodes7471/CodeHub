import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        tags:[{
            type:String,
            lowercase:true
        }],
        name:{
            type:String,
            required:true
        },
        headline:{
            type:String,
            required:true
        },
        statement:{
            type:String,
            required:true
        },
        code:{
            type:String
        },
        visibility:{
            type:Boolean,
            required:true
        },
        language:{
            type:String,
            required:true
        },
        upvotes:{
            type:Number,
            required:true
        }
    },{
        timestamps:true
    }
)

export const Question = mongoose.model("Question" , questionSchema);