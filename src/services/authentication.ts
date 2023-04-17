import express, { Request, Response } from "express";
import { UserModel, createUser, getUserByEmail } from "../schema/user";
import { authHash, random } from "../utils/index";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt + authentication.password"
    );

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authHash(user.authentication.salt, password);

    if (expectedHash != user.authentication.password) {
      return res.sendStatus(400);
    }

    const salt = random();
    user.authentication.sessionToken = authHash(salt, user._id.toString());

    user.save();

    res.cookie("AUTH-COOKIE", user.authentication.sessionToken, {
      domain: "localhost",
    });

    res.sendStatus(200).json(user).end();
  } catch (error) {
    return res.sendStatus(400).json();
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existUser = await getUserByEmail(email);

    if (existUser) {
      return res.sendStatus(400).json("User already exist");
    }

    const salt = random();
    const user = await createUser({
      email: email,
      username: username,
      authentication: authHash(salt, password),
    });

    return res.sendStatus(200).json(user).end();
  } catch (error) {
    return res.sendStatus(400).json();
  }
};
