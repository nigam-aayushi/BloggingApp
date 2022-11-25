const mongoose = require('mongoose')

mongoose.connect(process.env.URL, {useNewUrlParser : true})

const con = mongoose.connection;
con.once('open', (req, res)=> {
    console.log('mongoose has connected')
})