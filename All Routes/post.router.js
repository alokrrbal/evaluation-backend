const express = require("express")
const {PostModel} = require ("../module/post.module")

const postRouter = express.Router()

postRouter.get("/",async(req,res)=>{
    const user = req.body.creater
    console.log(user)
    try{
        const posts = await PostModel.find({creater:user})
        res.status(200).send(posts)
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})

postRouter.post("/create",async(req,res)=>{
    try{
        const newPost = new PostModel(req.body)
        await newPost.save()
        res.status(200).send({"msg":"New Post uploaded Successfully"})
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})


postRouter.patch("/update/:id" , async(req,res)=>{
    const{id}= req.params
    const post =await PostModel.findOne({_id:id})
    if(post){
        try{
            if(req.body.creater == post.creater){
                await PostModel.findByIdAndUpdate({_id:id},req.body) 
                res.status(200).send({"msg":"Post Updated Successfully"})
            }else{
                res.status(400).send({"err":"You are not autherized to do this operation"})
            }
        }catch(err){
            res.status(400).send({"err":err.message})
        }
    }else{
        res.status(400).send({"err":"Post Not Found"})
    }
    
})
postRouter.delete("/delete/:id" , async(req,res)=>{
    const{id}= req.params
    const post =await PostModel.findOne({_id:id})
    if(post){
        try{
            if(req.body.creater == post.creater){
                await PostModel.findByIdAndDelete({_id:id}) 
                res.status(200).send({"msg":"Post Deleted Successfully"})
            }else{
                res.status(400).send({"err":"You are not autherized to do this operation"})
            }
        }catch(err){
            res.status(400).send({"err":err.message})
        }
    }else{
        res.status(400).send({"err":"Post Not Found"})
    }
    
})

module.exports={
    postRouter
}


// { "email" :"Crypto 1",
//   "body":"Talking about ETH",
//   "device":"TAB"
// }