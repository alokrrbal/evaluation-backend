var jwt = require('jsonwebtoken');

const isAuth = async(req,res,next)=>{
    const token = req.headers.authorization
    try{
        if(token){
            var decoded = jwt.verify(token.split(' ')[1], 'mediaApp');
            if(decoded){
                req.body.creater = decoded.auther
                next()
            }else{
                res.status(400).send({"err":"Please Login Fast"})
            }
        }else{
            res.status(400).send({"err":"Please Login Fast"})
        }
    }catch(err){
        res.status(400).send({"err":err.message})
    }
}

module.exports={
    isAuth
}