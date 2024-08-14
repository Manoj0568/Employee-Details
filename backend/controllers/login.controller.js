import { User } from "../schemas/users.schema.js";
import findUser from "../utils/findUser.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const loginController = async (req,res,next)=>{
      
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
      const {username,password} = req.body
      if(username == "" || password == '' || !username || !password){
        return res.status(400).json({error:"username or password can't be empty"})
      }else if(password.length<6){
        return res.status(400).json({error:"password should be minimum 6 character"})
      }else{
        let existingUser = await findUser(username)
        
        if(existingUser){
            let checkPassword = await bcrypt.compareSync(password,existingUser?.password)
           if(checkPassword){
            const token = jwt.sign({id:existingUser._id},JWT_SECRET_KEY,{expiresIn: 1000 * 60 * 30 })
            res.cookie('authToken', token, {
              expires: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes from now
              httpOnly: true, // Prevents JavaScript access to the cookie
              sameSite: 'Lax', 
              secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
            });
            res.status(200).json({existingUser})
           }else{
            res.status(400).json({error:"user or password not correct"})
           } 
           
        }else{
            return res.status(400).json({error:"user or password not correct"})
         
            
        }
      }

}

export default loginController;