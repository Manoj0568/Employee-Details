import { Employee } from "../schemas/employee.schema.js";

const updateEmployeeController = async (req,res,next)=>{
   const {id} = req.params
   const payload = req.body
   console.log(req.body)
   console.log(payload, "id", id)
   if(!id || !payload){
    return res.status(500).json({error:"user or payload not found for this id"})
   }else{
      try {
        const result = await Employee.findByIdAndUpdate(id,payload)

        if(!result) return res.status(500).json({error:"Internal server error"})

            return res.status(200).json({message:"Successfully updated"})
      } catch (error) {
        return res.status(500).json({error:"Internal server error"})
      }
   }

}

export default updateEmployeeController