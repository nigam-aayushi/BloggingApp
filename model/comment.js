const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  comment : {
    type : String,
    require : true
},
  isActive : {
     type : Boolean,
     default : true
  },
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user',
    require : true
  },
  blogId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'blogs',
    require : true
  }
})
schema.set('timestamps', true)

module.exports = mongoose.model('comments', schema)