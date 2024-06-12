import { prisma } from "../helpers/connection";

export const getStockById = async (stockId: number) => {
  return await prisma.stock.findUnique({
    where: {
      id: stockId,
    },
  });
};
