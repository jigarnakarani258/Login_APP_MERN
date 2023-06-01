import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from './../assets/profile.png'
import styles from "./../styles/Username.module.css";
import toast,{ Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerFormValiadate } from "./../helper/validate";
import imageToBase64Converter from "../helper/imageToBase64Converter";
import { registerUser } from "../helper/helper";

function Register() {

    const [file, setFile] = useState()
    const formik = useFormik({
        initialValues: {
            email: 'jd@gmail.com',
            username: 'jd',
            password: 'jd@123'
        },
        validate: registerFormValiadate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            values = await Object.assign(values, { profile: file || '' })
            let registerPromise = registerUser(values)

            toast.promise(registerPromise, {
                loading: 'Creating...',
                success : <b>Register Successfully..!!</b>,
                error : <b> Couldn't Register User..!! </b>
            });
        }

    })

    /**** Formik does not support file upload so we need to create this file handler function ****/
    const onUpload = async (event) => {

        const base64 = await imageToBase64Converter(event.target.files[0])
        setFile(base64);
    }

    return (
        <div className="container mx-auto">

            <Toaster position="top-center" reverseOrder={false}></Toaster>

            <div className="flex justify-center items-center h-screen">
                <div className={styles.glass} >

                    <div className="title flex flex-col items-center">
                        <h4 className="text-5xl font-bold mt-2">
                            Register
                        </h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Happy to join You!!
                        </span>
                    </div>

                    <form className="py-1" onSubmit={formik.handleSubmit} >

                        <div className="profile flex justify-center py-4 ">

                            <label htmlFor="profile">
                                <img
                                    className={styles.profile_img}
                                    src={file || avatar}
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
                            <input
                                className={styles.textbox}
                                type="text"
                                placeholder="Email*"
                                {...formik.getFieldProps('email')}
                            />
                            <input
                                className={styles.textbox}
                                type="text"
                                placeholder="Username*"
                                {...formik.getFieldProps('username')}
                            />
                            <input
                                className={styles.textbox}
                                type="text"
                                placeholder="Password*"
                                {...formik.getFieldProps('password')}
                            />
                            <button
                                className={styles.btn}
                                type='submit'
                            > Sign Up(Register) </button>
                        </div>

                        <div className="text-center py-4">
                            <span>
                                Already Register?
                                <Link className="text-red-500" to='/login'>
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

export default Register;