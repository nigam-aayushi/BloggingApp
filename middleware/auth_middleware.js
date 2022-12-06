const jwt = require('jsonwebtoken')
const user_schema = require('../model/user_schema')

const checkAuthUser = async (req,res,next) => {
    let token;
    const {authorization} = req.headers;
    try{
    if(authorization && authorization.startsWith("Bearer")){
        token = authorization.split(" ")[1];
        const { userID } = jwt.verify(token,process.env.SCREATE_KEY) 
        req.user  = await user_schema.findById(userID).select('-password')
        next();
    }else{
        res.status(403).json({
            status : 'Failed',
            message : "Authorization is Empty or Bearer"
        })
    }
    }catch(error){
     res.status(500).json({
          status : 'Failed',
          message : error.message
     })

    }
    if(!token){
        res.status(401).send({"message" : "Unauthorized User No Token"})   
       }       
}

module.exports = {checkAuthUser}