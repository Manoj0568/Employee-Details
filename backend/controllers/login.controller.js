import { User } from "../schemas/users.schema.js";
import findUser from "../utils/findUser.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const generateAccessToken = (existingUser)=>{
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
   return jwt.sign({id:existingUser},JWT_SECRET_KEY,{expiresIn: 1000 *3   })
  //  1000 * 60 * 30

}

const generateRefreshToken = (existingUser)=>{
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
  return  jwt.sign({id:existingUser},REFRESH_TOKEN_SECRET,{expiresIn:1000 * 60 * 30})
}

export const loginController = async (req,res,next)=>{
      
    
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
           const accessToken = generateAccessToken(existingUser._id)
           const refreshToken = generateRefreshToken(existingUser._id)

           res.cookie('authToken',accessToken, {
            expires: new Date(Date.now() + 1000 *3 ), // 30 minutes from now
            httpOnly: true, // Prevents JavaScript access to the cookie
            sameSite: 'Lax', 
            secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
          })
            console.log("existing user",existingUser)
            res.status(200).json({existingUser,refreshToken})
           }else{
            res.status(400).json({error:"user or password not correct"})
           } 
           
        }else{
            return res.status(400).json({error:"user or password not correct"})
         
            
        }
      }

}


export const refreshController = async(req,res,next)=>{
      const {refreshToken,existingUser} = req.body
      console.log(refreshToken,existingUser)
        console.log("refreshController")
        const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
        jwt.verify(refreshToken,REFRESH_TOKEN_SECRET,(err,user)=>{
          if(err) return res.status(403)

            const accessToken = generateAccessToken(existingUser)
            res.cookie('authToken',accessToken, {
              expires: new Date(Date.now() + 1000 *3 ), // 30 minutes from now
              httpOnly: true, // Prevents JavaScript access to the cookie
              sameSite: 'Lax', 
              secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
            })

            res.status(200).json({accessToken})
        })
}
