const express = require('express')
const router = express.Router()
const userRouter = require('../userRoutes/userRouter')
const blogRouter = require('../blogRoutes/blogRouter')
const commentRouter = require('../commentRoutes/commentRouter')

router.use('/user', userRouter)  
router.use('/blog',blogRouter)
router.use('/comment',commentRouter)

module.exports = router 
