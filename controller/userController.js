const User = require('../model/user_schema')
const brcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSignup = async (req,res) => {
    const userData = new User(req.body)
    console.log('====>pass',userData.password);
    try{
    if(userData != null){
        const exists = await User.findOne({email : userData.email})
        if(exists != null){
           return res.json({
             status : 200,
             message : "User Account already Exists"
           })
        }else{
             const salt = await brcrypt.genSalt(10)
             userData.password = await brcrypt.hash(userData.password,salt);
             const filePath =`/uploads/${req.file.filename}`;
             userData.user_profile = filePath
            const saveUser = await userData.save();
            res.json({
                status : 201,
                message : "Your Data insert successfully",
                user : saveUser
              })
        }
    }else{
        res.json({
            status : 200,
            message : "Please fill Data all field"
          })
    }
  }catch(error) {
    res.json({
        status : 200,
        message : error.message
      })
  }
}

const userLogin = async (req, res) =>{

    const userCheck = new User(req.body)
    try{
    if(userCheck != null){
        const exists = await User.findOne({email : userCheck.email})
        if(exists != null){
            const isMatch = await brcrypt.compare(userCheck.password,exists.password)
            if(userCheck.email === exists.email && isMatch){
                const token = await jwt.sign({userID : exists._id},process.env.SCREATE_KEY)
                const userShow = await User.findOne({email : userCheck.email}).select('-password')
              return res.json({
                status : 200,
                message : "User Login Successfully",
                token : token,
                userData : userShow
              })
            }else{
                res.json({
                    status : 200,
                    message : "Password is not correct",
                  })
            }
        }else{
            res.json({
                status : 200,
                message : "User Email incorrect ",
              })
        }
    }
  }catch(error){
    res.json({
        status : 200,
        message : error.message
      })
  }
}

const resetPassword = async (req,res) => {

    console.log("restPassword==>",req.user)
    try{
      //const password = await brcrypt.
    }catch(err){

    }
} 

module.exports = {userSignup,userLogin,resetPassword}
