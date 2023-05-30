import User from './../models/User.model.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import OTPGenerator from "otp-generator";

export async function verifyUser(req , res , next) {

    try {
        const { username } =  req.method == 'GET' ?  req.query : req.body ;

        const findUser = await User.findOne({ username });

        if (!findUser) {
            return res.status(400).send({ error: "Can't find user!!" })
        }

        next();
    }
    catch (error) {
        return res.status(404).send({ error: "Authentication error!!" })
    }

}

/****** Post Method for Register ******/
/****** URL:- http://localhost:3001/api/register ******/
/*@param
   email: 'j@gmail.com',
   username: 'jpatel',
   password: 'j@patel'
   profile : ''
   firstname : 'Jigar'
   lastname : 'Patel'
   mobile : 9900990099
   address : 'Surat'
*/
export async function Register(req, res) {

    try {

        const { username, password, email, profile } = req.body;

        //check user is already exist or not 
        let findUser = await User.findOne({ username })
        if(findUser){
            return res.status(400).send({ error: "User is already exist, please provide unique username!!" })
        }

        //check email is already exist or not 
        let findEmail = await User.findOne({ email })
        if(findEmail){
            return res.status(400).send({ error: "Email is already exist, please provide unique Email!!" })
        }

        //compare password 
        if (password) {
            bcrypt.hash(password, 10)
                .then(hasedpassword => {

                    //create model object for storeing data in mongodb
                    const user = new User({
                        username: username,
                        password: hasedpassword,
                        email: email,
                        profile: profile
                    })

                    //save data in mongodb
                    user.save()
                        .then(() => {
                            return res.status(201).send({
                                 message : "User registered sucessfully!!",
                                 username
                            })
                        })
                        .catch(error => {
                            return res.status(500).send({ error })
                        })
                })
                .catch(error => {
                    return res.status(500).send({
                        error: "Enable to hased password"
                    })
                })
        }

    } catch (error) {
        return res.status(500).send({ error })
    }

}

/****** Post Method for Login ******/
/****** URL:- http://localhost:3001/api/login ******/
 /*@param
    username: 'jpatel',
    password: 'j@patel'
 */
export function Login( req , res ) {

    const { username , password } = req.body;

    try {

        User.findOne( {username} )
            .then( user => {
                bcrypt.compare(password , user.password)
                    .then( passwordCheck  => {
                            
                        if(!passwordCheck) return res.status(400).send({ error: "Don't have Password"});
                        //create jwt token 
                        const token = jwt.sign( 
                                            { 
                                                userId : user._id ,
                                                username : user.username
                                            }, 
                                            process.env.JWT_SECRET_KEY,
                                            {
                                                "expiresIn" : "24h"
                                            }
                                     );
                            console.log(user.username);
                        return res.status(200).send({ 
                            "message": "User Login Sucessfully!!",
                            "username" : user.username,
                            "token" : token
                         })
                                    
                    })
                    .catch(error => {
                        return res.status(400).send({ error : "Invalid Password!!" })
                    })
            
            })
            .catch(error => {
                return res.status(404).send({ error : "Username not Found!!" })
            })
    } 
    catch (error) {
        return res.status(500).send({ error })
    }
    
}


/****** GET Method for GetUser ******/
/****** URL:- http://localhost:3001/api/user/:username ******/
 /*@param
    username: 'jpatel'
 */
    export async function GetUser( req , res ) {
        
        const { username } = req.params ;

        try {

            if (!username) {
                return res.status(400).send({ error: "Invalid username!!" })
            }
            
            const user = await User.findOne( {username} );
            
            if (!user) {
                return res.status(400).send({ error: `Can't find user with this username ${username}!!` })
            }

            //Remove password form user , it is confidentional
            //mongoose return unnecessary data with object so convert it into json
            const { password , ...rest } = Object.assign( {} , user.toJSON())

            return res.status(200).send(rest)
        } 
        catch (error) {
            return res.status(500).send({ error: "Can't find user data !!" })
        }

        
    }

/****** PUT Method for updateUser ******/
/****** URL:- http://localhost:3001/api/updateUser ******/
 /*@param{
    "header" : "<token>"
    }
   @body{
    firstname : 'Jigar'
    lastname : 'Patel'
    address : 'Surat'
    profile : ''
    }
 */ 
    export async function UpdateUser( req , res ) {

        //const { id } = req.query 
        const { userId } = req.user ;

        try {
           
            const body = req.body;
                
            //update user data
            let updateduser = await User.updateOne({ _id : userId } , body ) 

            if(!updateduser)
            {
                return res.status(500).send({ error: "user not updated!!" })
            }
            else{
                return res.status(201).send({ "message": "user updated sucessfully!!" })
            }
            
        } 
        catch (error) {
            return res.status(500).send({error})
        }
    }


/****** GET Method for GenarateOTP ******/
/****** URL:- http://localhost:3001/api/genarateOTP ******/
    export async function GenarateOTP( req , res ) {
        
        req.app.locals.OTP = await OTPGenerator.generate(6 , {
                                    lowerCaseAlphabets  : false, 
                                    upperCaseAlphabets  : false, 
                                    specialChars : false
                                  }
                            )

        res.status(201).send({ code : req.app.locals.OTP })
    }

/****** GET Method for VerifyOTP ******/
/****** URL:- http://localhost:3001/api/verifyOTP ******/
export function VerifyOTP( req , res ) {
    
    const { code } = req.query ;

    if(  parseInt(req.app.locals.OTP) === parseInt(code))
    {
        //reset OTP value
        req.app.locals.OTP = null ;

        //start session for reset password
        req.app.locals.resetSesion = true ;

        return res.status(201).send({ "message" : "Verify OTP successfully!!" })
    }

    return res.status(400).send({ "message" : "Invalid OTP!!" })
}

//sucessfully redirect user when OTP is valid
/****** GET Method for CraeteResetSession ******/
/****** URL:- http://localhost:3001/api/craeteResetSession ******/
export function CraeteResetSession( req , res ) {
    
    if(req.app.locals.resetSesion){

        //allow access to this route only once
        req.app.locals.resetSesion = false ;

        return res.status(201).send({ "message" : "Access Granted for reset password!!" })
    }

    return res.status(401).send({ "message" : "Session expired for reset password!!" })
}

//update user password when user have valid session
/****** PUT Method for ResetPassword ******/
/****** URL:- http://localhost:3001/api/resetPassword ******/
export async function ResetPassword( req , res ) {
    
    if(!req.app.locals.resetSession) 
        return res.status(401).send({ "message" : "Session expired for reset password!!" })

    try {
        const { username , password } = req.body ;

        User.findOne({ username })
        .then(user => {
            bcrypt.hash(password,10)
                .then( async (hashedpassword) => {

                    let updatepassword = await User.updateOne( {username : user.username} , { password:hashedpassword} ) 
                    if(!updatepassword){
                        return res.status(500).send({ error: "password not updated!!" })
                    }
                    else{
                        req.app.locals.resetSession = false; // reset session
                        return res.status(201).send({ "message": "Reset Password Sucessfully!!" })
                    }
                })
                .catch(error => {
                    return res.status(404).send({ error : "Enable to hashed password" })
                })
        })
        .catch(error => {
            return res.status(404).send({ error : `Can't find user with this username ${username}!!` })
        })

    }
    catch (error) {
        return res.status(401).send({ error })
    }
}