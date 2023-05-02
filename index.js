const express = require("express")
require('dotenv').config()
const {connection} = require("./db")
const {userRouter} = require("./All Routes/user.router")
const {isAuth} = require("./middleWear/isAuth")
const {postRouter} = require("./All Routes/post.router")
const app = express()
app.use(express.json())


app.use("/users",userRouter)

app.use(isAuth)
app.use('/posts', postRouter)

const port = process.env.port

app.listen( port , async (req,res)=>{
    try{
        await connection
        console.log("Mongo Server Runs");
    }catch(err){
        console.log(err);
        console.log("Some Error OccouredS IN Mongo");
    }
    console.log(`Server Is Running On Port No ${port}`)
})