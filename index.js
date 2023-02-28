const dotenv = require('dotenv').config()
const express = require('express')
require('./model/config')
const bodyPaser= require('body-parser')
// const session = require('express-session') 
const commonRouter = require('./routes/mainRoutes/mainRouter')
const app = express();

app.use(express.json())
app.use(bodyPaser.json());
app.use('/', commonRouter)
// app.use(session({
//     secret: "ramajnare",
//     saveUninitialized: true,
//     resave: true
// }));


// app.get("/", function(req, res){   
//     // req.session.key = value
//     req.session.name = 'GeeksforGeeks'
//     return res.send("Session Set")
// })
app.listen(process.env.PORT,(req,res) => {
    console.log(`server running on port no : ${process.env.PORT}`)
})
