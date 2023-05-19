import mongoose from 'mongoose'
import { MongoMemoryServer } from "mongodb-memory-server";

async function connect(){

    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();

    const dbconnection = await mongoose.connect(getUri) ;
    console.log("Database connected");

    return dbconnection;
}

export default connect;