import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN

/**************Make API requests **************/

//*** to get username from token  ***//
export async function getUsernameFromToken(username) {
  const token = localStorage.getItem("token");

  if (!token) {
    return Promise.reject("Can't find token");
  }

  let decode = jwt_decode(token);
  return decode;
}


//*** authenticate User ***//
export async function authenticate(username) {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "Username doesn't exist..!!" };
  }
}

//*** get User details***//
export async function getUser( {username} ) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Username doesn't exist..!!" };
  }
}

//*** register User function***//
export async function registerUser(credentials) {
  try {
    let res = await axios.post("/api/register", credentials);
    let { username, email } = credentials;

    console.log(res.status , res.data.message);
    /***send Email ***/
    if (res.status === 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: res.data.message,
        subject : "Login APP - Sign up process"
      });
    }

    return Promise.resolve(res);
  } catch (error) {
    console.log(error.response.data.error);
    return Promise.reject(error.response.data.error);
  }
}

//*** login User function ***//
export async function login({ username, password }) {
  try {
    if (username) {
      const res = await axios.post("/api/login", { username, password });
      //console.log(res);
      return Promise.resolve(res);
    }
  } catch (error) {
      //console.log(error.response.data.error);
      return Promise.reject(error.response.data.error);
    }
}

//*** update User function ***//
export async function updateUser(updateUserData) {
  try {
    const token = await localStorage.getItem("token");

    const data = await axios.put("/api/updateUser", updateUserData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.resolve({ error: "Couldn't update user profile...!!" });
  }
}

//*** generate OTP  ***//
export async function generateOTP(username) {
  try {
    const { data : {code} , status } = await axios.get("/api/generateOTP", {
      params: { username : username }
    });

    //send mail with the OTP
    if(status === 201){
        let { data : {email} } = await getUser({username}) ;
        let message = `Your password recovery OTP is ${code}. Verify code and recover your password..`
        let subject = "Login APP - password recovery OTP"
        await axios.post("/api/registerMail", {
            username,
            userEmail: email,
            text: message,
            subject
          });
    }

    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

//*** verify OTP  ***//
export async function verifyOTP( { username , code }) {
    try {
      const { data , status } = await axios.get("/api/verifyOTP", {
        params: { username , code },
      });
      return { data , status };

    } catch (error) {
        return Promise.reject({ error });
    }
  }

//*** Reset Password ***//
export async function resetPassword( { username , password }) {
    try {
      const { data , status } = await axios.put("/api/resetPassword", { username , password });
      return Promise.resolve({ data , status });

    } catch (error) {
        return Promise.reject({ error });
    }
  }