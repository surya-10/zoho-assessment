import mongoose  from "mongoose";


let details = new mongoose.Schema(
    {
        age:{
            type:Number,
            required:true
        },
        dob:{
            type:String,
            required:true
        },
        mobile:{
            type:String,
            required:true
        },
        gender:{
            type:String,
            required:true
        },
        userId:{
            type:String,
            required:true
        }
    },{
        timestamps:true
    }
)

let Details = mongoose.model("Details", details);

export default Details;