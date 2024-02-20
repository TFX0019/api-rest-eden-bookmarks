import { Schema, model } from "mongoose";
import { UserInput } from "../schemas/user";

const userSchema = new Schema({
    name: String,
    email: String,
    password: String
}, {
    timestamps: true,
    versionKey: false
});

export const User = model("User", userSchema);

export const getUserByEmail = (email: string) => User.findOne({email})
export const createuser = (user: UserInput) => User.create(user)
export const getUserById = (id: string) => User.findById(id)