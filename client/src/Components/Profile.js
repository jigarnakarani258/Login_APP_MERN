import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from './../assets/profile.png'
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profilePageValiadate } from "./../helper/validate";
import imageToBase64Converter from "../helper/imageToBase64Converter";

import styles from "./../styles/Username.module.css";
import extendStyles from "./../styles/Profile.module.css";

function Profile() {

    const [file, setFile] = useState()
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            mobile: '',
            email: '',
            address: ''
        },
        validate: profilePageValiadate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            values = await Object.assign(values, { profile: file || '' })
            console.log(values);
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

                            <div className="name flex w-3/4 gap-10">
                                <input
                                    className={` ${styles.textbox} ${extendStyles.textbox} `}
                                    type="text"
                                    placeholder="First Name*"
                                    {...formik.getFieldProps('firstname')}
                                />
                                <input
                                    className={` ${styles.textbox} ${extendStyles.textbox} `}
                                    type="text"
                                    placeholder="Last Name*"
                                    {...formik.getFieldProps('lastname')}
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
                            <span>
                                Come back later?
                                <Link className="text-red-500" to='/'>
                                    Logout
                                </Link>
                            </span>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default Profile;