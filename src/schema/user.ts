import mongoose from "mongoose";
import { UserInterface } from "src/interfaces/userInterface";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model("Users", userSchema);

// Methods of User
export const getUsers = () => UserModel.find();
export const getUserByEmail: any = (email: string) =>
  UserModel.find({ email: email });
export const getUserbySessionToken = (token: string) =>
  UserModel.find({ "authentication.sessionToken": token });
export const getUserById = (id: String) => UserModel.findById(id);
export const createUser = (values: UserInterface) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUser = (id: string) => UserModel.findByIdAndDelete(id);
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
