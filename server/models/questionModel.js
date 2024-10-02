import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        tags:[{
            type:String,
            lowercase:true
        }],
        username:{
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
        language:{
            type:String,
            required:true
        },
        upvotes:{
            type:Number,
            default:0
        },
        date:{
            type:String,
            required:true
        }
    },{
        timestamps:true
    }
)

export const Question = mongoose.model("Question" , questionSchema);