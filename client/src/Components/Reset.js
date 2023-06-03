import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./../styles/Username.module.css";
import toast ,{ Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import  {resetPasswordValidate}  from "./../helper/validate";
import { useAuthStore } from "../store/store";
import { resetPassword } from "../helper/helper";
import useFetch from "../hooks/fetch.hook";

function Reset() {

    const { username } = useAuthStore(state => state.auth);
    const navigate = useNavigate();
  
    const  [getData]  = useFetch('createResetSession');

    const { isLoading , apiData, serverError , status } = getData ;

    const formik = useFormik({
        initialValues : {
            password : '',
            confirmPassword : ''
        },
        validate : resetPasswordValidate ,
        validateOnBlur : false ,
        validateOnChange : false ,
        onSubmit : async values => {
             
            let resetPasswordPromise = resetPassword( { username , password : values.password }) ;

            toast.promise( resetPasswordPromise , {
                loading : 'Updating password..',
                success : <b> Password Reset Successfully..!!</b>,
                error : <b> Could not reset password..!!</b>
            })

            resetPasswordPromise.then( () => {
                navigate('/password')
            })
        }

    })

    if (isLoading)
        return <h1 className="text-2xl font-bold">isLoading</h1>;
    if (serverError)
      return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
    if(status && status !== 201)
        return <Navigate to={'/password'} replace={true}></Navigate>

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

                    </form>

                </div>
            </div>
        </div>
    )
}

export default Reset;