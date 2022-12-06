const user_schema = require('./userSchema')

module.exports = {

    userRegister : async (req, res,next) =>{
        const  value = await user_schema.registerUser.validate(req.body, {abortEarly : false})
        if(value.error){
            res.status(204).json({
                status : "Failed",
                message : value.error.details[0].message
            })
        }else{
            next()
        }
    },

    userLogin : async (req,res,next) => {
        const value = await user_schema.loginUser.validate(req.body, {abortEarly : false})
        if(value.error){
        res.status(204).json({
             status : "Failed",
             message : value.error.details[0].message
        })
        }else{
           next()
        }
    }
}