import toast from 'react-hot-toast';

/** validate login page username */
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);
    return errors;
}

/** validate login page password */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);
    return errors;
}

/** validate Reset page password */
export async function resetPasswordValidate(values){
    const errors = passwordVerify({}, values);

    if( values.password != values.confirmPassword ){
        errors.exist = toast.error("Password and confirm password are not match!!")
    }
    return errors;
}

/** validate register form */
export async function registerFormValiadate(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);
    
    return errors;
}

/** validate username */
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Username can not contains blank space...!')
    }else{
        
    }

    return error;
}


/** validate password */
function passwordVerify(error = {}, values){

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        error.password = toast.error('password Required...!');
    }else if(values.password.includes(" ")){
        error.password = toast.error('password can not contains blank space...!')
    }else if(values.password.length < 4){
        error.password = toast.error('Password length must be more then 4 character!')
    }
    else if(!specialChars.test(values.password)){
        error.password = toast.error('Password contains atleast one special character!')
    }else{

    }

    return error;
}


/** validate email */
function emailVerify(error = {}, values){

    if(!values.email){
        error.email = toast.error('email Required...!');
    }else if(values.email.includes(" ")){
        error.email = toast.error('email can not contains blank space...!')
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }else{

    }

    return error;
}