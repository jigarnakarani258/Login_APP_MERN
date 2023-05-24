import axois from "axois";

/**************Make API requests **************/

//*** authenticate User ***// 
export async function authenticate( username ){

    try {
        return await axois.post('/api/authenticate' , {username}) ;
    } 
    catch (error) {
       return { error : "Username doesn't exist..!!"} ;
    }
} 

//*** get User details***//
export async function getUser( {username} ){

    try {
        const { data } =  await axois.get(`/api/user/:${username}` ) ;
        return {data} ;
    } 
    catch (error) {
       return { error : "Username doesn't exist..!!"} ;
    }
} 


//*** register User function***// 
export async function registerUser( credentials  ){

    try {
        const { data : { message } , status } =  await axois.post('/api/register', credentials ) ;
        let { username , email } = credentials ;

        /***send Email ***/
        if( status === 201)
        {
            await axois.post('/api/registerMail' , { username , userEmail : email , text : message })
        }

        return Promise.resolve(message)
    } 
    catch (error) {
       return Promise.resolve({error}) ;
    }
} 


//*** login User function ***//
export async function login( { username , password }  ){

    try {
       
        if(username){
            const { data } =  await axois.post('/api/login', { username , password } ) ;
            return Promise.resolve({ data })
        }
    } 
    catch (error) {
       return Promise.resolve( { error : "Password doesn't match...!!"} ) ;
    }
} 


//*** update User function ***// 
export async function updateUser( updateUserData  ){
    try {

        const token = await localStorage.getItem('token')
    
        const data  =  await axois.put('/api/updateUser',
                                        updateUserData ,
                                        { headers : { "Authorization":`Bearer ${token}`} }
                                     ) ;
        return Promise.resolve({ data })
       
    } 
    catch (error) {
       return Promise.resolve( { error : "Couldn't update user profile...!!"} ) ;
    }
} 


//*** generate OTP  ***// 
export async function generateOTP( username ){

    try {

        const { data } =  await axois.get('/api/generateOTP' , username ) ;
        return Promise.resolve({ data })
       
    } 
    catch (error) {
       return Promise.resolve( { error : "Password doesn't match...!!"} ) ;
    }
} 