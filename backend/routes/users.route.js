import { Router } from "express";
import {userController, getUser} from "../controllers/user.controller.js";
import signupController from "../controllers/signup.controller.js";
import loginController from "../controllers/login.controller.js";
import logoutController from "../controllers/logout.controller.js";

const userRoute = Router()

userRoute.get("/user",userController,getUser)
userRoute.post("/signup",signupController)
userRoute.post("/login",loginController)
userRoute.get("/logout",logoutController)

export default userRoute;