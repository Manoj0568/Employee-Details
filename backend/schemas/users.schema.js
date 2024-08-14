import mongoose from "mongoose";

const schema = mongoose.Schema

const user = new schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    }
})


export const User = mongoose.model("user",user)