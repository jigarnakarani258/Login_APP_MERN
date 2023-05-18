import toast from 'react-hot-toast';

/** validate login page username */
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);
    return errors;
}

/** validate username */
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...!')
    }

    return error;
}

/** validate login page password */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);
    return errors;
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