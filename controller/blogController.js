const BlogSchema = require('../model/blog_schema')
const CommentSchema  = require('../model/comment')


const blogCreate = async (req,res) => {
    console.log(req.body);
     const blogData = new BlogSchema(req.body)
    try{
        const  filePath = `/uploads/${req.file.filename}` 
        blogData.blog_pic = filePath
        const addBlogs = await blogData.save();
        res.status(201).json({
            status : 201,
            message : "Your Blog Store Successfully",
        })
    }catch(err){
       res.json({
        status : 500,
        message : err.message
       })
    }
} 

const listOfBlogs = async (req, res) => {
    try{
        const blogsList = await BlogSchema.find()
        .populate('userId', {name:1}).sort({"createdAt": -1})
        res.status(200).json({
            status : "Success",
            message : blogsList
        })
    }catch(err){
      res.json({
        status : 500,
         message : err.message
      })
    }
}


const blogDetails = async (req, res) => {
    const id = req.params.id
    try{
        const userBlog = await BlogSchema.findById(id,{ title:1, discribtion:1, blog_pic:1,_id:0 })
        const userComment = await CommentSchema.find({blogId : id }).sort({"createdAt": -1})
        .populate('userId',{name : 1, user_profile : 1, createdAt: 1, _id : 0})
        res.status(200).json({
            status : "Success",
            Blogs : userBlog,
            CommentAndUser : userComment
        })
    }catch(err){
         res.status(500).json({
            status : 500,
            message : err.message
         })
    }
}

const deleteBlog = async (req, res) => {
    const id = req.params.id
    try{
         await BlogSchema.findByIdAndDelete(id)
        res.status(202).json({
            status : 202,
            message : "Blog Delete SuccessFully"
         })
    }catch(err){
        res.json({
            status : "Fialed",
            message : err.message
         })
    }
}

const likeBlog = async (req, res) => {
    const {id,like} = req.params
    try{
        const blogLike = await BlogSchema.findById(id).select('like')        
         if(like === 'true'){ 
            let likes = blogLike.like
            likes++
             await BlogSchema.findOneAndUpdate(blogLike._id, {$set : {like : likes}}, {new : true})
             res.status(200).json({
            status : "Success",
            message : "Like Successfully"
         })
         } else{
            let likes = blogLike.like
            likes--
            await BlogSchema.findOneAndUpdate(blogLike._id, {$set : {like : likes}}, {new : true})
            res.status(200).json({
                status : "Success",
                message : "Dislike Successfully"
             })
         }    
    }catch(err){ 
        res.status(500).json({
            status : "Fialed",
            message : err.message
         })
    }
}

const searchBlog = async (req, res) => {
    const title = req.body.title
    try{
         const query = {title : {$regex: title, $options: "i"}}
         const searchData = await BlogSchema.find(query)
         res.status(200).json({
            status : "Success",
            BlogDetails : searchData
         })
    }catch(err){
      res.status(500).json({
        status : "Faild",
        message : err.message
      })
    }
} 
module.exports = { blogCreate, listOfBlogs, blogDetails, deleteBlog, likeBlog, searchBlog }