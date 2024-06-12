import { prisma } from "../helpers/connection";

export const updateStockCurrentPrice = async (stockId: number) => {
  // Get all transactions for the stock
  const transactions = await prisma.transaction.findMany({
    where: {
      stockId,
    },
  });
};
