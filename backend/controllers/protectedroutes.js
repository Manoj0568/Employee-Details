import jwt from 'jsonwebtoken'
import { User } from '../schemas/users.schema.js';

const protectroute = async (req,res,next)=>{
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    const token = req.cookies['authToken'];
    console.log(token,"this is token inside protected routes")
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


export default protectroute;