import { User } from "../schemas/users.schema.js";

const findUser = async(username)=>{
    const userFound = await User.findOne({username})
    console.log(userFound)
    if(userFound) return userFound
    return false
}

export default findUser;