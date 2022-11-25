const express = require('express')
const router = express.Router();
const user = require('../../controller/userController')
const {upload} = require('../../middleware/imageStorage')
const userAuth = require('../../middleware/auth_middleware')
const userVal = require('../../validations/userValSchema/userValidation')


router.post('/create', upload.single("user_profile"), user.userSignup)
router.post('/login', userVal.userLogin, user.userLogin)
router.get('/auth',userAuth.checkAuthUser,user.resetPassword)

module.exports = router
