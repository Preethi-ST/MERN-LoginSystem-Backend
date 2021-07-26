const nodemailer = require('nodemailer');


const sendEmail = (options) => {

    const transporter = nodemailer.createTransport({
        service : process.env.EMAIL_SERVICE,
        auth : {
            user : process.env.EMAIL_USERNAME,
            pass : process.env.EMAIL_PASSWORD
        }
    })
    const mailDetails = {
        from : process.env.EMAIL_FROM,
        to : options.to,
        subject : options.subject,
        html : options.text
    }

    transporter.sendMail(mailDetails,function(err,data){
        if(err){
            console.log(err)
        }
        else{
            console.log(data);
        }
    })
}

module.exports = sendEmail