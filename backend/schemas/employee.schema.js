import mongoose from "mongoose";

const schema = mongoose.Schema

const employee = new schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true,
        match: /^[0-9]{10}$/,
        minlength: 10,
        maxlength:10
    },
    designation:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    }
},{timestamps:true})

export const Employee = mongoose.model("Employee",employee)