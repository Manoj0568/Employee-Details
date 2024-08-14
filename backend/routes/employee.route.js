import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { employeeController } from "../controllers/employee.controller.js";
import multer from "multer";
import path from 'path'
import protectroute from "../controllers/protectedroutes.js";
import getEmployeeController from "../controllers/getEmployee.controller.js";
import deleteEmployeeController from "../controllers/deleteEmployee.controller.js";
import updateEmployeeController from "../controllers/updateEmployee.controller.js";

export const employeeRoute = Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

employeeRoute.post("/",protectroute, upload.single('image'),employeeController)
employeeRoute.get("/",protectroute,getEmployeeController)
employeeRoute.delete("/:id",protectroute, deleteEmployeeController)
employeeRoute.put("/:id",protectroute,updateEmployeeController)