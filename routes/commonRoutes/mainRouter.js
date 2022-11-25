const express = require('express')
const router = express.Router()
const userRouter = require('../userRoutes/userRouter')
const blogRouter = require('../blogRoutes/blogRouter')

router.use('/user', userRouter)  
router.use('/blog',blogRouter)

module.exports = router 
