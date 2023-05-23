import jwt from "jsonwebtoken";

/*********** Auth Middleware ***********/
export default async function Auth( req , res , next) {
    try {
        //access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1] ;

        //retriving the user details from logged in user. 
        const decodedToken = await jwt.verify( token , process.env.JWT_SECRET ,)
       
        req.user = decodedToken ;
       
        next();
    } 
    catch (error) {
        return res.status(404).send({ error: "Authentication error!!" })
    }
}

// Middleware for accessing local variables at outside 
export async function localVariables( req , res , next) {
   
    req.app.locals = {
        OTP : null,
        resetSession : false
    } ;
    
    next();
   
}