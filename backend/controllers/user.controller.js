import { User } from "../schemas/users.schema.js";
import jwt from 'jsonwebtoken'


export const userController = (req,res,next)  =>{
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const headers = req.headers.cookie
    console.log(headers, JWT_SECRET_KEY)
    const token = headers?.split("=")[1]
    
    if(!token){
        return  res.status(401).json({error:"No token found"})
        
      }
      try {
          
          jwt.verify(String(token),JWT_SECRET_KEY,(err,user)=>{
            
              if(err?.name == "JsonWebTokenError"){
                  return next(res.status(401).json({message:err})) 
              }
              
              req.tokenId = user.id
          })
          next()
      } catch (error) {
          return res.status(401).json({message:error.message})
      }
    }

    export const getUser = async(req,res,next)=>{
        const userId = req.tokenId
        let user;
        try {
            user = await User.findById(userId,"-password")
           
                
        } catch (error) {
            return new Error(err)
        }
        if(!user){
            return res.status(401).json({message:"invalide user token"})
        }
    
        return res.status(200).json(user)
    }

    