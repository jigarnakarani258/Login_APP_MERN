import React from "react";
import { Link , useNavigate } from "react-router-dom";
import avatar from './../assets/profile.png'
import styles from "./../styles/Username.module.css";
import toast , { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import  {passwordValidate}  from "./../helper/validate";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import { login } from "../helper/helper";

function Password() {

    const navigate = useNavigate();
    const username = useAuthStore(state => state.auth.username);
  
    const  [getData]  = useFetch(`/user/${username}`);

    const { isLoading , apiData, serverError , status } = getData ;

    const formik = useFormik({
        initialValues : {
            password : 'Jigs@123'
        },
        validate : passwordValidate ,
        validateOnBlur : false ,
        validateOnChange : false ,
        onSubmit : async values => {
            
            let loginPromise = login({ username, password : values.password })
            toast.promise(loginPromise, {
              loading: 'Checking...',
              success : <b>Login Successfully...!</b>,
              error : <b>Password Not Match!</b>
            });
      
            loginPromise.then(res => {
              let { token } = res.data;
              localStorage.setItem('token', token);
              navigate('/profile')
            }).catch( err=> {
                navigate('/password')
            })
        }

    })

    
    if(isLoading) 
        return <h1 className='text-2xl font-bold'>isLoading</h1>;
    if(serverError) 
        return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

    return (
        <div className="container mx-auto">

            <Toaster position="top-center" reverseOrder={false}></Toaster>

            <div className="flex justify-center items-center h-screen">
                <div className={ styles.glass } >

                    <div className="title flex flex-col items-center">
                        <h4 className="text-5xl font-bold mt-2"> 
                            Hello {apiData?.firstName || apiData?.username} 
                        </h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500"> 
                             Explore more by connecting with us.. 
                        </span>
                    </div>

                    <form className="py-1" onSubmit={formik.handleSubmit} >
                        
                        <div className="profile flex justify-center py-4 "> 
                            <img 
                                className={ styles.profile_img } 
                                src={ apiData?.profile || avatar}  
                                alt="avtar"
                            /> 
                        </div>

                        <div className="textbox flex flex-col items-center gap-6"> 
                            <input 
                                className={ styles.textbox } 
                                type="text"  
                                placeholder="Password"
                                {...formik.getFieldProps('password')} 
                            />
                            <button 
                                className={ styles.btn }  
                                type='submit' 
                            > Sign In  </button>
                        </div>

                        <div className="text-center py-4">
                            <span> 
                                Forgot Password? 
                                <Link className="text-red-500" to='/recovery'>
                                    Recovery password now
                                </Link>
                            </span>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default Password;
