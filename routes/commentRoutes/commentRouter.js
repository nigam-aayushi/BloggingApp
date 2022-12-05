const express = require('express')
const router = express.Router()
const commentController = require('../../controller/commentController')


router.post('/user-comment', commentController.addComment)

module.exports = router