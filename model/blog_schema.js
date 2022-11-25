const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    discribtion : {
        type : String,
        require : true
    },
    status : {
        type : Boolean,
        default : true
    },
    like : {
        type : Number,
        default : 0,
        require : true
    },
    blog_pic : {
        type : String,
        require : true
    },
    isActive :{
     type : Boolean,
     default : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        require : true
    }
})
schema.set('timestamps', true)

module.exports = mongoose.model('blogs', schema)
