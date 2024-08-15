import express from 'express'
import dbConnect from './db/dbConnect.js'
import dotenv from 'dotenv'
import userRoute from './routes/users.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { employeeRoute } from './routes/employee.route.js'
import path from 'path'
import { fileURLToPath } from 'url';

// Set up __dirname using fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()
const app = express()
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: "GET, POST, DELETE, PUT",
//     credentials: true
// }))
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use("/api",userRoute)
app.use("/api/employee",employeeRoute)
app.use(express.static(path.join(__dirname,"../frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
})

app.listen(PORT,(err,req,res,next)=>{
    dbConnect()
    console.log(`listening on port http://localhost:${PORT}`)
})