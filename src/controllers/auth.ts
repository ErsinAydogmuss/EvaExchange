import { Request, Response } from "express";
import { RegisterModel } from "../models/register";
import { prisma } from "../helpers/connection";
import { badRequest, serverError, ok } from "../helpers/response";
import { register } from "../queries/register";
import { LoginModel } from "../models/login";
import { findUserByEmailOrUsername } from "../queries/findUserByEmailOrUsername";

export const registerController = async (req: Request, res: Response) => {
  const registerUserData: RegisterModel = req.body;

  try {
    const emailIsTaken = await prisma.user.findFirst({
      where: {
        email: registerUserData.email,
      },
    });

    if (emailIsTaken) {
      return badRequest(res, "Email is already taken");
    }

    const phoneIsTaken = await prisma.user.findFirst({
      where: {
        phone: registerUserData.phone,
      },
    });

    if (phoneIsTaken) {
      return badRequest(res, "Phone is already taken");
    }

    const user = await register(registerUserData);
    if (user) {
      return ok(res, user);
    } else {
      return badRequest(res, "User could not be created");
    }
  } catch (error) {
    return serverError(res);
  }
};

export const loginController = async (req: Request, res: Response) => {
  const userData: LoginModel = req.body;

  try {
    const user = await findUserByEmailOrUsername(userData);

    if (user) {
      if (user.password == userData.password) {
        return ok(res, user);
      } else {
        return badRequest(res, "Password is incorrect");
      }
    } else {
      return badRequest(res, "User could not be found");
    }
  } catch (error) {
    return serverError(res);
  }
};
