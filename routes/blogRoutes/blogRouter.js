const express = require('express')
const router = express.Router()
const {upload} = require('../../middleware/imageStorage')
const userAuth = require('../../middleware/auth_middleware') 
const blogController =  require('../../controller/blogController')
const blogVal = require('../../validations/blogValidation/blog_validation')


router.post('/add-blog', userAuth.checkAuthUser, upload.single('blog_pic'), blogController.blogCreate)
router.get('/blog-list', userAuth.checkAuthUser, blogController.listOfBlogs)
router.get('/user-blog/:id', userAuth.checkAuthUser , blogController.blogDetails)
router.get('/blog-delete/:id', userAuth.checkAuthUser, blogController.deleteBlog)
router.get('/blog-like/:id/:like', userAuth.checkAuthUser, blogController.likeBlog)  
router.post('/blog-search',userAuth.checkAuthUser, blogController.searchBlog)

module.exports = router
