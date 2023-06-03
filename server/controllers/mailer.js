import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import Mailgen from "mailgen";

let configOptions = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user : process.env.EMAIL,
        pass : process.env.EMAIL_PASSWORD
    }
}

let transporter = nodemailer.createTransport(configOptions);


let mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/'
        
    }
});

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "jpatel",
  "userEmail" : "j@gmail.com",
  "text" : "",
  "subject" : "",
}
*/
export const registerMail = async ( req , res ) => {
    
    const { username , userEmail , text , subject } = req.body ;

    //create body of email
    var email = {
        body : {
            name: username,
            intro: text || `Welcome to Jigar's Login! We are very excited to have you on board.`,
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    // Generate an HTML email with the provided contents
    var emailBody = mailGenerator.generate(email);

    var mailOptions = {
        from : process.env.EMAIL ,
        to: userEmail ,
        subject: subject || 'Login APP',
        html: emailBody
    }

    transporter.sendMail(mailOptions)
        .then( () => {
            return res.status(200).send({ "message": "You should receive an email from us."})
        })
        .catch(error => res.status(500).send({ error }))
}
