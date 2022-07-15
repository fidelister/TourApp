import express from "express";
import colors from 'colors';
import cors from "cors";
import dotenv from "dotenv/config"
import connectDB from './config/db.js'
import morgan from "morgan";
import userRouter from "./routes/user.js"
import tourRouter from "./routes/tour.js"

const port = process.env.PORT || 5000;
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())
app.use("/user", userRouter)
app.use("/user/tour", tourRouter)

app.get('/', (req, res)=>{
  res.send('hello Tour app')
})
connectDB().then(()=> 
app.listen(port, ()=>console.log(`server started on ${port}`))
)