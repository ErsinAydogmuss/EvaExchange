import { prisma } from "../helpers/connection";

export const getPortfolioStockByStockIdAndPortfolioId = async (
  portfolioId: number,
  stockId: number
) => {
  return await prisma.stockOnPortfolio.findFirst({
    where: {
      portfolioId,
      stockId,
      quantity: {
        gt: 0,
      },
    },
  });
};
