import mongoose from 'mongoose'
import { MongoMemoryServer } from "mongodb-memory-server";

async function connect(){

    const mongod = await MongoMemoryServer.create();
    //const getUri = mongod.getUri();

    //connect mongo db atlas directly
    const dbconnection = await mongoose.connect(process.env.DATA_BASE) ;
    console.log("Database connected");

    return dbconnection;
}

export default connect;