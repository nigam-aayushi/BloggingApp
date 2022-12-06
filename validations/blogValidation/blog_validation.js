const blogSchema = require('./blog_schema')

module.exports =  {

    blogValidation : async (req, res, next) =>{
        const data = req.body
        console.log("blog data====>",data);
        const value = await blogSchema.add_blogs.validate(req.body, {abortEarly : false})
         if(value.error){
            res.satus(204).json({
                status : "Faild",
                message : value.error.details[0].message
            })
         }else{
            next
         }
    }
}