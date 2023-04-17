import { NextFunction, Request, Response } from "express";
import lodash from "lodash";

import { getUserbySessionToken } from "../schema/user";

export const isAuthenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies["AUTH-COOKIE"];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existUser = await getUserbySessionToken(sessionToken);
    if (!existUser) {
      return res.sendStatus(403);
    }

    lodash.merge(req, { identity: existUser });

    return next();
  } catch (error) {}
};
