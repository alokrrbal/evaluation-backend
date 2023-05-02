const express = require("express")
const bcrypt = require('bcrypt');
const {UserModel} = require("../module/users.module")
var jwt = require('jsonwebtoken');
const userRouter = express.Router()

userRouter.post("/register" , async(req,res)=>{
    const {name,email,gender,password} =  req.body

    try{
        bcrypt.hash(password, 5,async(err, hash) => {
            const newUser = new UserModel({name,email,gender,password:hash})
            await newUser.save()
        })
        res.status(200).send({"msg":"New User Registerd!"})
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    const user = await UserModel.findOne({email})
    try{
        if(user){
            bcrypt.compare(password, user.password,(err, result)=> {
                if(result){
                    var token = jwt.sign({ auther: user.name }, 'mediaApp');
                    res.status(200).send({"msg":"Login Success","token":token})
                }else{
                    res.status(400).send({"err":'Wrong Password'})
                }
            })
        }else{
            res.status(400).send({"err":"Unable To Find The User"})
        }
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})

module.exports={
    userRouter
}
