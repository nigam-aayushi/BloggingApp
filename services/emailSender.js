const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service : "Gmail",
    auth : {
        user : "aayushi.nigam@techvalens.com",
        pass : "Meenu@25"
    }
});

module.exports = { transporter }