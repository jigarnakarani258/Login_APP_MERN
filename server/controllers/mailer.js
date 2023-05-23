import nodemailer from "nodemailer";
import Mailgen from "mailgen";

let configOptions = {
    host: "smtp.ethwreal.com",
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
        body: {
            name: username,
            intro: text || 'Welcome to JN_InfoTech! We are very excited to have you on board.',
            action: {
                instructions: 'To get started with Mailgen, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };

    // Generate an HTML email with the provided contents
    var emailBody = mailGenerator.generate(email);

    var mailOptions = {
        from : process.env.EMAIL ,
        to: userEmail ,
        subject: subject || 'SignUP Process',
        html: emailBody
    }

    transporter.sendMail(mailOptions)
        .then( () => {
            return res.status(200).send({ "message": "You should receive an email from us."})
        })
        .catch( error => {
           return
        })
}