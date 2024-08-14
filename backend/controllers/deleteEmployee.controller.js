import { Employee } from "../schemas/employee.schema.js";

const deleteEmployeeController = async (req,res,next)=>{
   const {id} = req.params

   if(!id){
    return res.status(500).json({error:"user not found for this id"})
   }else{
      try {
        const result = await Employee.findByIdAndDelete(id)

        if(!result) return res.status(500).json({error:"Internal server error"})

            return res.status(200).json({message:"Successfully deleted"})
      } catch (error) {
        return res.status(500).json({error:"Internal server error"})
      }
   }

}

export default deleteEmployeeController