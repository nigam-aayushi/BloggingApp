const express = require('express')
const router = express.Router();
const user = require('../../controller/userController')
const {upload} = require('../../middleware/imageStorage')
const userAuth = require('../../middleware/auth_middleware')
const userVal = require('../../validations/userValSchema/userValidation')


router.post('/create',upload.single("user_profile"), user.userSignup)
router.post('/login', userVal.userLogin, user.userLogin)
router.post('/email-rest-pass',user.emailForResetPass)
router.post('/rest-password/:userId/:token', user.resetPassword)
router.get('/user-blogs/:id',userAuth.checkAuthUser, user.myBlog)
router.patch('/update-blog-user/:id',userAuth.checkAuthUser,user.blogUpdateByUser)

module.exports = router
