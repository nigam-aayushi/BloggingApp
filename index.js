const dotenv = require('dotenv').config()
const express = require('express')
require('./model/config')
const bodyPaser= require('body-parser')
const commonRouter = require('./routes/commonRoutes/mainRouter')
const app = express();

app.use(express.json())
app.use(bodyPaser.json());
app.use('/', commonRouter)

app.listen(process.env.PORT,(req,res) => {
    console.log(`server running on port no : ${process.env.PORT}`)
})
