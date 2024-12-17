import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        educatorId:{
            type:String,
            required:true
        },
        avgRating:{
            type:Number || String,
            default:'Unrated'
        },
        feedbacks:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'CourseFeedback'
        }],
        videos:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'CourseVideo',
        }],
        notes:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'CourseNotes',
        }],
        duration:{
            value:{
                type:Number,
                required:true
            },
            unit:{
                type:String,
                required:true
            }
        },
        enrolled:{
            type:Number,
            default:0
        },
        enrolledList:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }],
        price:{
            value:{
                type:Number,
                required:true,
                default:0
            },
            unit:{
                type:String,
                value:'USD'
                //use a currency convertor api and make changes to it accordingly
                //https://rapidapi.com/interzoid/api/real-time-currency-rates/playground/apiendpoint_259c00b2-f184-433b-b1d5-bcd3e9762ade

            }
        },
        // country:{
        //     type:String,
        //     required:true
        // }
    },{
        timestamps:true
    }
)

export const Upvote = mongoose.model("Course" , courseSchema);