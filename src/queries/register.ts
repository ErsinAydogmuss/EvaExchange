import { prisma } from "../helpers/connection";
import { RegisterModel } from "../models/register";

export const register = async (registerModel: RegisterModel) => {
  return await prisma.user.create({
    data: {
      username: registerModel.username,
      name: registerModel.name,
      surname: registerModel.surname,
      phone: registerModel.phone,
      email: registerModel.email,
      password: registerModel.password,
      portfolio: {
        create: {},
      },
    },
  });
};
