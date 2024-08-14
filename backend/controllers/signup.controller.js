import { User } from "../schemas/users.schema.js";
import findUser from "../utils/findUser.js";
import bcrypt from 'bcrypt'

const signupController = async (req,res,next)=>{
      const {username,password} = req.body
      if(username == "" || password == '' || !username || !password){
        return res.status(400).json({error:"username or password can't be empty"})
      }else if(password.length<6){
        return res.status(400).json({error:"password should be minimum 6 character"})
      }else{
        let existingUser = await findUser(username)
        if(existingUser){
            return res.status(400).json({error:"user aleready exists"})
        }else{
            const hashPass = bcrypt.hashSync(password, 10);
           const newUser = new User({
            username,password:hashPass
           })

          await newUser.save()
         return res.status(200).json({newUser})
            
        }
      }

}

export default signupController;