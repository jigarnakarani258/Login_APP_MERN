import express from "express";
const router = express.Router();


/************ POST method  *************/
router.route('/register').post( ( req , res ) => { res.json('register route')})  //register route
router.route('/registerMail').post( ( req , res ) => { res.json('registerMail route')}) //send the mail
router.route('/authenticate').post( ( req , res ) => { res.json('authenticate route')})  //authenticate user
router.route('/login').post( ( req , res ) => { res.json('login route')}) //login in app


/************ GET method  *************/
router.route('/user/:username').get( ( req , res ) => { res.json('username route')})   //user with username
router.route('/generateOTP').get( ( req , res ) => { res.json('generateOTP route')})   //generate random OTP
router.route('/verifyOTP').get( ( req , res ) => { res.json('VerifyOTP route')})       //verify generated OTP
router.route('/createResetSession').get( ( req , res ) => { res.json('createResetSession route')}) //reset all the variables


/************ PUT method  *************/
router.route('/updateUser').put( ( req , res ) => { res.json('updateUser route')})   //update user profile
router.route('/resetPassword').put( ( req , res ) => { res.json('resetPassword route')})  //reset password 


export default router;