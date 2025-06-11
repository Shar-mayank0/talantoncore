import mongoose from "mongoose";
import { Schema, Document } from "mongoose";


export interface IUser extends Document {
    name: string;
    email: string;
    password: string;  
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.models.User as mongoose.Model<IUser> || mongoose.model<IUser>("User", userSchema);

export default User;