const BlogSchema = require('../model/blog_schema')


const blogAdd = async (req,res) => {
     const blodData = new BlogSchema(req.body)
     console.log(blodData);
    try{
        const blogData = await blodData.save();
        res.json({
            status : 201,
            message : "Your Blog Store Successfully"
        })
    }catch(err){

    }
} 

module.exports = { blogAdd }