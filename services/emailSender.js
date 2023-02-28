const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service : "Gmail",
    auth : {
        user : "aayushi.nigam@techvalens.com",
        pass : "123456"
    }
});

module.exports = { transporter }