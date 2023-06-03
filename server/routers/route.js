import {Router} from "express";
import  {Register, Login, GetUser, UpdateUser , GenarateOTP , VerifyOTP , CreateResetSession, ResetPassword,
    verifyUser }  from "../controllers/appController.js";
const router = Router();
import Auth , { localVariables } from "./../middlewares/auth.js";
import {registerMail} from "./../controllers/mailer.js";

/************ POST method  *************/
router.route('/register').post( Register )  //register route
router.route('/registerMail').post( registerMail ) //send the mail
router.route('/authenticate').post( verifyUser , ( req , res ) => { res.json('authenticate route')})  //authenticate user
router.route('/login').post( verifyUser , Login ) //login in app


/************ GET method  *************/
router.route('/user/:username').get( GetUser )   //user with username
router.route('/generateOTP').get( verifyUser , localVariables,  GenarateOTP )   //generate random OTP
router.route('/verifyOTP').get( verifyUser , VerifyOTP)       //verify generated OTP
router.route('/createResetSession').get( CreateResetSession ) //reset all the variables


/************ PUT method  *************/
router.route('/updateUser').put( Auth , UpdateUser )   //update user profile
router.route('/resetPassword').put( verifyUser,ResetPassword )  //reset password 


export default router;