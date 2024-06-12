import { prisma } from "../helpers/connection";
import { LoginModel } from "../models/login";

export const findUserByEmailOrUsername = async (userData: LoginModel) => {
  return await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: userData.email,
        },
        {
          username: userData.username,
        },
      ],
    },
  });
};
