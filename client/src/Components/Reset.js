import React from "react";
import { Link } from "react-router-dom";
import styles from "./../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import  {resetPasswordValidate}  from "./../helper/validate";

function Reset() {

    const formik = useFormik({
        initialValues : {
            password : '',
            confirmPassword : ''
        },
        validate : resetPasswordValidate ,
        validateOnBlur : false ,
        validateOnChange : false ,
        onSubmit : async values => {
            console.log(values);
        }

    })

    return (
        <div className="container mx-auto">

            <Toaster position="top-center" reverseOrder={false}></Toaster>

            <div className="flex justify-center items-center h-screen">
                <div className={ styles.glass } >

                    <div className="title flex flex-col items-center">
                        <h4 className="text-5xl font-bold mt-2"> 
                            Reset Password 
                        </h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500"> 
                             Enter new password.. 
                        </span>
                    </div>

                    <form className="py-25" onSubmit={formik.handleSubmit} >

                        <div className="textbox flex flex-col items-center gap-6"> 
                            <input 
                                className={ styles.textbox } 
                                type="text"  
                                placeholder="New Password"
                                {...formik.getFieldProps('password')} 
                            />
                            <input 
                                className={ styles.textbox } 
                                type="text"  
                                placeholder="Confirm Password"
                                {...formik.getFieldProps('confirmPassword')} 
                            />
                            <button 
                                className={ styles.btn }  
                                type='submit' 
                            > Reset  </button>
                        </div>

                        <div className="text-center py-4">
                            <span> 
                                Login Again? 
                                <Link className="text-red-500" to='/username'>
                                    Login now
                                </Link>
                            </span>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default Reset;