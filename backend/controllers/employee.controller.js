import multer from "multer"
import path from 'path'
import { Employee } from "../schemas/employee.schema.js"



export const employeeController = async(req,res,next)=>{
      console.log(req.headers)
      const {name,email,mobile,designation,gender,course} = req.body;
      const imagePath = req.file.path;
      if(name=="" || email=="" || mobile=="" || designation=="" || gender=="" ||course=="" || imagePath==""){
        return res.status(500).json({error:"feilds can't be empty"})
      }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return res.status(500).json({error:"enter a correct email id"})
      }else{
        const existing = await Employee.findOne({email})

        if(existing){
           return res.status(500).json({error:"record alreay exist"})
        } 

        try {
            const newEmployee = new Employee({name,email,mobile,designation,gender,course,image:imagePath})
            await newEmployee.save()
            res.status(200).json({newEmployee})
        } catch (error) {
            return res.status(500).json({error:"Internal Server Error"})
        }
      }
      console.log(imagePath)
      

      
      
}
