const CommentSchema = require('../model/comment')


const addComment = async (req, res) =>{
    console.log(req.body)
    const comment = new CommentSchema(req.body)
    try{
       const userComment = await  comment.save()
       res.status(201).json({
        status : 201,
        message : "Comment Add Successfully"
       })
    }catch(err){
       res.status(500).json({
          status : 500,
          message : err.message 
       })
    }
}



module.exports = { addComment }