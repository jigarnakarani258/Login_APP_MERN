import User from './../models/User.model.js';

/****** Post Method for Register ******/
/****** URL:- http://localhost:3001/api/register ******/
 /*@param
    email: 'j@gmail.com',
    username: 'jpatel',
    password: 'j@patel'
    firstname : 'Jigar'
    lastname : 'Patel'
    mobile : 9900990099
    address : 'Surat'
    profile : ''
 */ 
export function Register( req , res ) {
    res.send({
        "message" : "Register"
    })
}

/****** Post Method for Login ******/
/****** URL:- http://localhost:3001/api/login ******/
 /*@param
    username: 'jpatel',
    password: 'j@patel'
 */
export function Login( req , res ) {
    res.send({
        "message" : "Login"
    })
}


/****** GET Method for GetUser ******/
/****** URL:- http://localhost:3001/api/user/:username ******/
 /*@param
    username: 'jpatel',
    password: 'j@patel'
 */
    export function GetUser( req , res ) {
        res.send({
            "message" : "GetUser"
        })
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