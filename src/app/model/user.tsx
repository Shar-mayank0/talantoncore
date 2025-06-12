import mongoose from "mongoose";
import { Schema, Document } from "mongoose";


export interface IUser extends Document {
    Name: string;
    Email: string;
    Password: string;  
    PhotoUrl?: [string]; // Optional field for user photo URL
}

const userSchema = new Schema<IUser>({
    Name: { type: String, required: false },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    PhotoUrl: { type: [String], required: false }
});

const User = mongoose.models.User as mongoose.Model<IUser> || mongoose.model<IUser>("User", userSchema);

export default User;