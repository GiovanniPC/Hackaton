"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(){

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.sparkpostmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    authMethod: "LOGIN",
    auth: {
      user: "SMTP_Injection", // generated ethereal user
      pass: "452d52801b88584c40c03c698255951ff9e061c0" // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <cocogoods@ironhackers.dev>', // sender address
    to: "giovannipaulocunha@hotmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

/*
Host smtp.sparkpostmail.com
Port 587
Alternative Port 2525
Authentication AUTH LOGIN
Encryption STARTTLS
Username SMTP_Injection
password: 452d52801b88584c40c03c698255951ff9e061c0
*/