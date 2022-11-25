const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name :{
    type : String,
    require : true
},
  email : {
    type : String,
    require : true
},
  password : {
    type : String,
    require : true
},
  city : {
    type : String,
    require : true
},
  state : {
    type : String,
    require : true
},
role : {
  type : String,
  default : "user",
  require : true
},
user_profile : {
  type : String,
  require : true
},
  isActive : {
     type : Boolean,
     default : true
  },
})
schema.set('timestamps', true)

module.exports = mongoose.model('user', schema)