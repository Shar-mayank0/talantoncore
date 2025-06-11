
import mongoose from "mongoose";

type MongooseConnection = {
    isConnected?: number ;
}

const connection : MongooseConnection = {};

async function dbConnect() : Promise<void>{
    if (connection.isConnected) {
        return;
    }

    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            return;
        }
        await mongoose.disconnect();
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI as string);
        connection.isConnected = db.connections[0].readyState;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }

}

export default dbConnect;import { disconnect, env, exit } from "process";
