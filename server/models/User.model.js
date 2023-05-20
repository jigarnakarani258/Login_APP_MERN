import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [ true, " Please provide unique Username"],
        unique: [ true, "Username is already exists!!"]
    },
    password: {
        type : String,
        required: [ true, " Please provide password of more than 4 character.."]
    },
    email: {
        type : String,
        required: [ true, " Please provide unique Email"],
        unique: [ true, "Email is already exists!!"]
    },
    firstName: {
        type: String,
        //required: [ true, " Please provide Firstname"]
    },
    lastName: {
        type: String,
        //required: [ true, " Please provide Lastname"]
    },
    mobile: {
        type: Number,
    },
    address: {
        type: String,
    },
    profile: {
        type: String,
    }
})

export default mongoose.model.Users || mongoose.model( 'User' , UserSchema) ;;