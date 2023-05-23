import User from './../models/User.model.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function verifyUser(req , res , next) {

    try {
        const { username } =  req.method == 'GET' ?  req.params : req.query ;

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
export function Register(req, res) {

    try {

        const { username, password, email, profile } = req.body;

        //check user is already exist or not 
        User.findOne({ username })
            .then(user => {
                if (user) {
                    return res.status(400).send({ error: "User is already exist, please provide unique username!!" })
                }
            })
            .catch(error => {
                return res.status(404).send({ error })
            })

        //check email is already exist or not 
        User.findOne({ email })
            .then(user => {
                if (user) {
                    return res.status(400).send({ error: "Email is already exist, please provide unique Email!!" })
                }
            })
            .catch(error => {
                return res.status(404).send(error)
            })

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
                                "message": "User registered sucessfully!!",
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
    username: 'jpatel',
    password: 'j@patel'
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

            return res.status(200).send(user)
        } 
        catch (error) {
            return res.status(500).send({ error: "Can't find user data !!" })
        }

        
    }

/****** PUT Method for updateUser ******/
/****** URL:- http://localhost:3001/api/updateUser ******/
 /*@param{
    id: '<userid>'
    }
   @body{
    firstname : 'Jigar'
    lastname : 'Patel'
    address : 'Surat'
    profile : ''
    }
 */ 
    export function UpdateUser( req , res ) {
        res.send({
            "message" : "UpdateUser"
        })
    }


/****** GET Method for GenarateOTP ******/
/****** URL:- http://localhost:3001/api/genarateOTP ******/
    export function GenarateOTP( req , res ) {
        res.send({
            "message" : "GenarateOTP"
        })
    }

/****** GET Method for VerifyOTP ******/
/****** URL:- http://localhost:3001/api/verifyOTP ******/
export function VerifyOTP( req , res ) {
    res.send({
        "message" : "VerifyOTP"
    })
}

//sucessfully redirect user when OTP is valid
/****** GET Method for CraeteResetSession ******/
/****** URL:- http://localhost:3001/api/craeteResetSession ******/
export function CraeteResetSession( req , res ) {
    res.send({
        "message" : "CraeteResetSession"
    })
}

//update user password when user have valid session
/****** PUT Method for ResetPassword ******/
/****** URL:- http://localhost:3001/api/resetPassword ******/
export function ResetPassword( req , res ) {
    res.send({
        "message" : "ResetPassword"
    })
}