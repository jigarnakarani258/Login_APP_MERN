
---------------------------------2-6-23--------------------
app.js
//update home route 
{
    path: '/',
    element: <Username/>
  },


register component 

const navigate = useNavigate();
registerPromise.then( function(){ navigate('/')})


helper.js
//*** login User function ***//
export async function login({ username, password }) {
  try {
    if (username) {
      const res = await axios.post("/api/login", { username, password });
      //console.log(res);
      return Promise.resolve(res);
    }
  }
  catch (error) {
      //console.log(error.response.data.error);
      return Promise.reject(error.response.data.error);
    }

}


password component 

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
            password : ''
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



Profile component

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from './../assets/profile.png'
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profilePageValiadate } from "./../helper/validate";
import imageToBase64Converter from "../helper/imageToBase64Converter";

import styles from "./../styles/Username.module.css";
import extendStyles from "./../styles/Profile.module.css";

import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import { updateUser } from "../helper/helper";

function Profile() {


    const navigate = useNavigate();
  
    const  [getData]  = useFetch();

    const { isLoading , apiData, serverError , status } = getData ;

    const [file, setFile] = useState()
    const formik = useFormik({
        initialValues: {
            firstName: apiData?.firstName || '',
            lastName:  apiData?.lastName || '',
            mobile:  apiData?.mobile || '',
            email:  apiData?.email || '',
            address:  apiData?.address || ''
        },
        enableReinitialize : true ,
        validate: profilePageValiadate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            values = await Object.assign(values, { profile: file || apiData?.profile || '' })
           
            let updateProfilePromise = updateUser(values)
            toast.promise(updateProfilePromise, {
              loading: 'Updating...',
              success : <b>Update Profile Successfully...!</b>,
              error : <b> Could not update Profile..!!</b>
            });
      
        }

    })

    if(isLoading) 
    return <h1 className='text-2xl font-bold'>isLoading</h1>;
    if(serverError) 
        return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

    /**** Formik does not support file upload so we need to create this file handler function ****/
    const onUpload = async (event) => {

        const base64 = await imageToBase64Converter(event.target.files[0])
        setFile(base64);
    }

    // logout user handler function
    function userLogout(params) {
        localStorage.removeItem('token');
        navigate('/')
    }

    return (
        <div className="container mx-auto">

            <Toaster position="top-center" reverseOrder={false}></Toaster>

            <div className="flex justify-center items-center h-screen">
                <div className={` ${styles.glass} ${extendStyles.glass} `} >
                    <div className="title flex flex-col items-center">
                        <h4 className="text-5xl font-bold mt-2">
                            Profile
                        </h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            You can update the details.
                        </span>
                    </div>

                    <form className="py-1" onSubmit={formik.handleSubmit} >

                        <div className="profile flex justify-center py-4 ">

                            <label htmlFor="profile">
                                <img
                                    className={` ${styles.profile_img} ${extendStyles.profile_img} `}
                                    src={ apiData?.profile || file || avatar}
                                    alt="avtar"
                                />
                            </label>
                            <input
                                type="file"
                                id='profile'
                                name="profile"
                                onChange={onUpload}
                            />

                        </div>

                        <div className="textbox flex flex-col items-center gap-6">

                            <div className="name flex w-3/4 gap-10">
                                <input
                                    className={` ${styles.textbox} ${extendStyles.textbox} `}
                                    type="text"
                                    placeholder="First Name*"
                                    {...formik.getFieldProps('firstName')}
                                />
                                <input
                                    className={` ${styles.textbox} ${extendStyles.textbox} `}
                                    type="text"
                                    placeholder="Last Name*"
                                    {...formik.getFieldProps('lastName')}
                                />
                            </div>

                            <div className="name flex w-3/4 gap-10">
                                <input
                                    className={` ${styles.textbox} ${extendStyles.textbox} `}
                                    type="text"
                                    placeholder="Mobile No*"
                                    {...formik.getFieldProps('mobile')}
                                />
                                <input
                                    className={` ${styles.textbox} ${extendStyles.textbox} `}
                                    type="text"
                                    placeholder="Email*"
                                    {...formik.getFieldProps('email')}
                                />
                            </div>

                            <input
                                className={` ${styles.textbox} ${extendStyles.textbox} `}
                                type="text"
                                placeholder="Address*"
                                {...formik.getFieldProps('address')}
                            />
                            <button
                                className={styles.btn}
                                type='submit'
                            > Update </button>

                        </div>

                        <div className="text-center py-4">
                            <span className='text-gray-500'>
                                Come back later?
                                <button onClick={userLogout} className='text-red-500' to="/">Logout</button>
                            </span>
                        </div>
                      
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Profile;





install jwt-decode in react project
and craete function in helper.js file

helper.js
import jwt_decode from "jwt-decode";

//*** to get username from token  ***//
export async function getUsernameFromToken(username) {
 
    const token = localStorage.getItem("token") ;

    if(!token)
    {
      return Promise.reject("Can't find token") ;
    }
    
    let decode = jwt_decode(token) ;
    return decode;

}






fetch.hook 

import axios from "axios";
import { useEffect, useState } from "react";
import { getUsernameFromToken } from "../helper/helper";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/****Custom Hook ****/
export default function useFetch(query) {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        const { username } = await getUsernameFromToken();
        const { data, status } = !query ?  await axios.get(`/api/user/${username}`)  : await axios.get(`/api/${query}`);

        if (status === 200) {
          setData((prev) => ({ ...prev, isLoading: false }));
          setData((prev) => ({ ...prev, apiData: data, status: status }));
        }

        setData((prev) => ({ ...prev, isLoading: false }));
      } 
      catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };

    fetchData();


  }, [query]);

  return [getData, setData];
}
