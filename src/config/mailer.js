import nodeMailer from"nodemailer"
require("dotenv").config();
 let adminEmail =process.env.MAIL_USER;
 let adminPassword = process.env.MAIL_PASSWORD;
 let mailHost = process.env.MAIL_HOST;
 let mailPort =process.env.MAIL_PORT
let sendMail=(to,subject,htmlContent)=>{
    let transporter =nodeMailer.createTransport({
        host:mailHost,
        port:mailPort,
        secure:false, 
        auth:{
            user:adminEmail,
            pass:adminPassword
        }
    })
    let options ={
        form:adminEmail,
        to:to,
        subject:subject,
        html:htmlContent
    }
    return transporter.sendMail(options)//this defaul return promise
}
module.exports = sendMail;