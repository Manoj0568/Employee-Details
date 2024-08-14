import { Employee } from "../schemas/employee.schema.js";


const getEmployeeController = async(req,res,next)=>{
       try {
        let data = await Employee.find()
        res.status(200).json({data})
       } catch (error) {
        res.status(500).json({error:"Internal server error"})
       }
}


export default getEmployeeController