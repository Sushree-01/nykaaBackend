const express = require("express");
const { connection } = require("./db");
const { userRouter} = require("./routes/user.routes");
const { productRouter } = require("./routes/product.routes");
const cors = require("cors")
require("dotenv").config()

const app=express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    try{
        res.status(200).send("Welcome to Nykka Backend App")
    }catch(error){
        res.status(400).send({"error":error})
    }
})
app.use("/api",productRouter)

app.use("/api",userRouter)

app.listen(process.env.port,async()=>{
    try{
        console.log("Connecting to DB")
        await connection
        console.log(`Server Running at PORT ${process.env.PORT}`)
        console.log("Connected to DB")
    }catch(err){
        console.log(err)
        console.log("Something Went Wrong...Please Try Again!!!")
    }
})