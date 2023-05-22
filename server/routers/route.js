import {Router} from "express";
import  {Register, Login, GetUser, UpdateUser , GenarateOTP , VerifyOTP , CraeteResetSession, ResetPassword
}  from "../controllers/appController.js";
const router = Router();


/************ POST method  *************/
router.route('/register').post( Register )  //register route
router.route('/registerMail').post( ( req , res ) => { res.json('registerMail route')}) //send the mail
router.route('/authenticate').post( ( req , res ) => { res.json('authenticate route')})  //authenticate user
router.route('/login').post( Login ) //login in app


/************ GET method  *************/
router.route('/user/:username').get( GetUser )   //user with username
router.route('/generateOTP').get( GenarateOTP )   //generate random OTP
router.route('/verifyOTP').get( VerifyOTP)       //verify generated OTP
router.route('/createResetSession').get( CraeteResetSession ) //reset all the variables


/************ PUT method  *************/
router.route('/updateUser').put( UpdateUser )   //update user profile
router.route('/resetPassword').put( ResetPassword )  //reset password 


export default router;