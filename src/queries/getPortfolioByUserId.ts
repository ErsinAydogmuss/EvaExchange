import { prisma } from "../helpers/connection";

export const getPortfolioByUserId = async (userId: string) => {
  return await prisma.portfolio.findFirst({
    where: {
      userId: userId,
    },
    include: {
      stocks: true,
      transactions: true,
    },
  });
};
