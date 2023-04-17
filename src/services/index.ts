import express, { Response } from "express";
import {
  getUserById,
  getUsers,
  deleteUser,
  updateUserById,
  getUserByEmail,
} from "../schema/user";
import { get } from "lodash";
import { authHash, random } from "src/utils";

const getAllUsers = async (
  req: express.Request,
  res: Response,
  next: express.NextFunction
) => {
  try {
    // Get Req data using lodash
    const authenticateUserId = get(req, "identity._id") as string;

    console.log("Auth User :: " + authenticateUserId);

    const users = await getUsers();
    if (!users) {
      return res.sendStatus(400);
    }

    return res.sendStatus(200).json(users).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};

const getUserDetails = async (req: any, res: Response) => {
  try {
    const { _id } = req.identity;
    if (!_id) {
      res.sendStatus(400);
    }

    const user = await getUserById(_id);

    if (!user) {
      res.send().json("User not found!");
    }

    res.sendStatus(200).json(user);
  } catch (error) {
    res.sendStatus(400);
  }
};

const deleteUserById = async (req: any, res: Response) => {
  try {
    const { _id } = req.identity;
    if (!_id) {
      res.sendStatus(400);
    }

    await deleteUser(_id);

    res.sendStatus(200).json("Account was deleted successfull!");
  } catch (error) {
    res.sendStatus(400);
  }
};

const updateUser = async (req: any, res: Response) => {
  try {
    const { _id } = req.identity;
    const { email, username } = req.body;

    if (!_id) {
      res.sendStatus(400);
    }

    if (!email || !username) {
      return res.sendStatus(400);
    }

    const existUser = await getUserByEmail(email);

    if (existUser) {
      return res.sendStatus(400).json("User already exist");
    }

    const user = await updateUserById(_id, {
      email: email,
      username: username,
    });

    if (!user) {
      res.send().json("Updated Unsuccessfull!");
    }

    res.sendStatus(200).json("Profile was updated successfull!");
  } catch (error) {
    res.sendStatus(400);
  }
};

// export default getData ;
export { getAllUsers, getUserDetails, deleteUserById, updateUser };
