const jwt = require('jsonwebtoken')
const user_schema = require('../model/user_schema')

const checkAuthUser = async (req,res,next) => {
    let token;
    const {authorization} = req.headers;
    //const userId = req.body
    console.log("authorization data===>", authorization )
    try{
    if(authorization && authorization.startsWith("Bearer")){
        token = authorization.split(" ")[1];
        let userId = req.body.userId;
        console.log("Auth token==>", userId);
        const { userID } = jwt.verify(token,process.env.SCREATE_KEY) 
        req.user  = await user_schema.findById(userID).select('-password')
        console.log("auth user ===>", req.user)
        next();
    }else{
        res.json({
            status : 'faild',
            message : "Authorization is Empty or Bearer"
        })
    }
    }catch(error){
     res.json({
          status : 'faild',
          message : error.message
     })
    }
    if(!token){
        res.status(401).send({"message" : "Unauthorized User No Token"})   
       }       
}

module.exports = {
    checkAuthUser
}