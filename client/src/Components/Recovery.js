import React from "react";
import styles from "./../styles/Username.module.css";
import { Toaster } from "react-hot-toast";

function Recovery() {

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

                    <form className="pt-25"  >

                        <div className="textbox flex flex-col items-center gap-6">

                            <span className="py-4 text-sm text-left text-gray-500">
                                Enter 6 Digit OTP sent to your email address..
                            </span>
                            <input
                                className={styles.textbox}
                                type="text"
                                placeholder="OTP"
                            />
                        
                            <button
                                className={styles.btn}
                                type='submit'
                            > Recover Password </button>

                        </div>

                        <div className="text-center py-4">
                            <span>
                                Can't get OTP?
                                <button
                                    className={"text-red-500"}
                                > Resend OTP </button>
                            </span>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default Recovery;