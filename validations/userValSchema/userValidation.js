const user_schema = require('./userSchema')

module.exports = {

    userRegister : async (req, res,next) =>{
        console.log("validation===>",req.body)
        const  value = await user_schema.registerUser.validate(req.body, {abortEarly : false})
        if(value.error){
            res.json({
                status : 400,
                message : value.error.details[0].message
            })
        }else{
            console.log('====>next call')
            next()
        }
    },

    userLogin : async (req,res,next) => {
        const value = await user_schema.loginUser.validate(req.body, {abortEarly : false})
        if(value.error){
        res.json({
             status : 400,
             message : value.error.details[0].message
        })
        }else{
           next()
        }
    }
}