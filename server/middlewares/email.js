 require("nodemailer");
const { transporter } = require("./email.config");
const {Verification_Email_Template,Welcome_Email_Template} = require("./emailTemplate");

const sendVerificationCode =async(email,verificationCode)=>{

    try {

        // console.log("from email.js:-",email,verificationCode)

        const response = await transporter.sendMail({
            from: '"ElectroEra" <electroera001@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Verify Your Email", // Subject line
            text: "Verify Your Email", // plain text body
            html:Verification_Email_Template.replace("{verificationCode}",verificationCode) // html body
          });
          console.log("Verification Email sent Successfully");
        
    } catch (error) {

        console.log(error);
        
    }
}

const welcomeEmail =async(email,name)=>{

    try {

        const response = await transporter.sendMail({
            from: '"ElectroEra" <electroera001@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Welcome to ElectroEra", // Subject line
            text: "Welcome to ElectroEra", // plain text body
            html:  Welcome_Email_Template.replace("{name}",name), // html body
          });
          console.log("Welcome Email sent Successfully");
        
    } catch (error) {

        console.log(error);
        
    }
}

module.exports = {sendVerificationCode,welcomeEmail};