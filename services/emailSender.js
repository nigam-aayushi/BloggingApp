const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service : "Gmail",
    auth : {
        user : "rajnare90@gmail.com",
        pass : "kcnddgusyrwtemoy"
    }
});

module.exports = { transporter }