const User = require('../model/user_schema')
const brcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { transporter } = require('../services/emailSender')
const BlogSchema = require('../model/blog_schema')


const userSignup = async (req,res) => {
    const userData = new User(req.body)
    try{
    if(userData != null){
        const alreadyExits = await User.findOne({email : userData.email})
        if(alreadyExits != null){
           return res.status(403).json({
             status : "Failed",
             message : "User Account Already Exists"
           })
        }else{
             const salt = await brcrypt.genSalt(10)
             userData.password = await brcrypt.hash(userData.password,salt);
             const filePath =`/uploads/${req.file.filename}`;
             userData.user_profile = filePath
             await userData.save();
             return res.status(201).json({
                status : "Success",
                message : "Your Data insert successfully",
              })
        }
    }else{
      return res.status(204).json({
            status : "Failed",
            message : "Please fill Data all field"
          })
    }
  }catch(error) {
    return res.status(500).json({
        status : "Failed",
        message : error.message
      })
  }
}

const userLogin = async (req, res) =>{

    const userData = new User(req.body)
    try{
    if(userData != null){
        const alreadyExits = await User.findOne({email : userData.email})
        if(alreadyExits != null){
            const isMatch = await brcrypt.compare(userData.password,alreadyExits.password)
            if(userData.email === alreadyExits.email && isMatch){
                const token = await jwt.sign({userID : alreadyExits._id},process.env.SCREATE_KEY, {expiresIn : '2d'})
                const userDetail = await User.findOne({email : userData.email}).select('-password')
                return res.status(200).json({
                status : "Success",
                message : "User Login Successfully",
                token : token,
                userData : userDetail
              })
            }else{
                res.status(401).json({
                    status : "Failed",
                    message : "Email or Password is not correct",
                  })
            }
        }else{
          return res.status(401).json({
                status : "Failed",
                message : "User Email incorrect ",
              })
        }
    }
  }catch(error){
    return res.status(500).json({
        status : "Failed",
        message : error.message
      })
  }
}

const emailForResetPass = async (req, res) => {
  const { email } = req.body
     try{
           const alreadyExits = await User.findOne({email : email})
           if(alreadyExits != null ){
                const screateKey = alreadyExits._id + process.env.SCREATE_KEY
                const token = await jwt.sign({userID : alreadyExits._id}, screateKey, {expiresIn : '20m'})
                const link = `http://127.0.0.1:3000/api/user/reset/${alreadyExits._id}/${token}`
                let info = transporter.sendMail({
                  from : "rajnare90@gmail.com",
                  to : "rajnare90@gmail.com",
                  subject : "Link send for reset password",
                  text : `<a href=${link}>Click on this for reset password</a>`
                })
                return res.status(200).json({
                  status : "Success",
                  message : "Email send to user Successfully",
                  Token : token,
                  userID : alreadyExits._id
                })
           }else{
             res.status(550).json({
                status : 'Failed',
                Message : "This Email User is not found " 
             })
           }
     }catch(err){
          res.status(500).json({
            status : 'Failed',
            message : err.message
          })
     }  
}

const resetPassword = async (req, res) => {
       const {userId,token} = req.params
       const {newPassword, confirmPass} = req.body
    try{
      const userExits = await User.findById(userId)
      if(userExits != null){
       const newToken = userId + process.env.SCREATE_KEY
      const {userID}= jwt.verify(token, newToken);
       if(newPassword === confirmPass){
        const salt = await brcrypt.genSalt(10)
        var password = await brcrypt.hash(confirmPass, salt)
        await User.findByIdAndUpdate(userExits._id, 
          {$set : {password : password}})
        res.status(200).json({
          status : "Success",
          Message : "Password rest successfully ",
        })  
       }else{
        res.status(401).json({
          status : "Failed",
          Message : "Password and Confirm is not match "
        })
       }
      }else{
        res.status(403).json({
          status : "Failed",
          Message : "User is not exits"
        })
      }
    }catch(err){
      res.status(500).json({
        status : "Failed",
        Message : err.message
      })
    }
} 

const myBlog = async (req, res) => {
  const { id } = req.params
   try{
         const userBlogs = await BlogSchema.find({userId : id })
        return res.status(200).json({
          status : "Success",
          UserBlogs : userBlogs,
         })
   }catch(err){
      res.status(500).json({
        status : "Failed",
        Message : err.message
      })
   }
}

const blogUpdateByUser = async (req, res) => {
   try{
     await BlogSchema.findByIdAndUpdate(req.params.id, req.body, {new : true})
     res.status(200).json({
      status : "Success",
      Message : "Update Successfully"
     })
   }catch(err){
     res.status(500).json({
         status  : "failed",
         Message : err.message
     })
   }
}

module.exports = {userSignup, userLogin, resetPassword, 
  emailForResetPass, myBlog, blogUpdateByUser}
