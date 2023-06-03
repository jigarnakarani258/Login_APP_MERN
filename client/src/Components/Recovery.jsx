import React, { useEffect, useState } from "react";
import styles from "./../styles/Username.module.css";
import toast ,{ Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/store";
import { generateOTP, verifyOTP } from "../helper/helper";
import { useNavigate } from "react-router-dom";

function Recovery() {

    const { username } = useAuthStore(state => state.auth);
    const [ OTP , setOTP] = useState() ;
    const navigate = useNavigate();

    useEffect( () => {

        generateOTP(username)
            .then( otp => {

                //console.log('OTP send your mail:-',otp);
                if(otp){
                   return toast.success('OTP has been send to your registerd email..!!')
                }
                return toast.error('Problem while generating OTP..!!')
            })     
    } , [username] )

    async function onSubmitHandler(event) {
      event.preventDefault();

      try {
        let res = await verifyOTP({ username, code: OTP });
        if (res.status === 201) {
          toast.success("OTP Verified Successfully..!!");
          return navigate("/reset");
        }
      } 
      catch (error) {
        return toast.error("OTP Verification Failed , check email again..!!");
      }

    }

    function resendOTP(){
        let resendOtpPromise =  generateOTP(username);

        toast.promise( resendOtpPromise , {
            loading : 'sending otp..',
            success : <b> OTP has been resend on your email..!!</b>,
            error : <b> could not send otp..!!</b>
        })

        resendOtpPromise.then( otp => {
            //console.log('Resend OTP:-',otp);
        })
    }

    return (
        <div className="container mx-auto">

            <Toaster position="top-center" reverseOrder={false}></Toaster>

            <div className="flex justify-center items-center h-screen">
                <div className={styles.glass} >

                    <div className="title flex flex-col items-center">
                        <h4 className="text-5xl font-bold mt-2">
                            Recovery
                        </h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Enter OTP for recover password..
                        </span>
                    </div>

                    <form className="pt-25"   onSubmit={onSubmitHandler} >

                        <div className="textbox flex flex-col items-center gap-6">

                            <span className="py-4 text-sm text-left text-gray-500">
                                Enter 6 Digit OTP sent to your email address..
                            </span>
                            <input
                                className={styles.textbox}
                                onChange={ event => setOTP(event.target.value) }
                                type="text"
                                placeholder="OTP"
                            />
                        
                            <button
                                className={styles.btn}
                                type='submit'
                            > Recover Password </button>

                        </div>

                    </form>

                    <div className="text-center py-4">
                            <span>
                                Can't get OTP?
                                <button
                                    className={"text-red-500"}
                                    onClick={resendOTP}
                                > Resend OTP </button>
                            </span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Recovery;