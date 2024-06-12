import { Stock, TransactionType } from "@prisma/client";
import { prisma } from "../helpers/connection";
import { ActionModel } from "../models/buy";

export const sellStock = async (actionData: ActionModel, stock: Stock) => {
  const updatedPortfolio = await prisma.portfolio.update({
    where: {
      userId: actionData.userId,
    },
    data: {
      wallet: {
        increment: actionData.totalAmount,
      },
    },
  });

  if (updatedPortfolio) {
    const transaction = await prisma.transaction.create({
      data: {
        quantity: actionData.quantity,
        price: stock.currentPrice,
        totalAmount: actionData.totalAmount,
        portfolioId: updatedPortfolio.id,
        stockId: stock.id,
        transactionType: TransactionType.SELL,
      },
    });

    await prisma.stockOnPortfolio.update({
      where: {
        stockId_portfolioId: {
          portfolioId: updatedPortfolio.id,
          stockId: stock.id,
        },
      },
      data: {
        quantity: {
          decrement: actionData.quantity,
        },
      },
    });

    const newPrice =
      stock.currentPrice.toNumber() -
      stock.price_impact_factor.toNumber() * actionData.quantity;

    const newPriceImpactFactor =
      stock.price_impact_factor.toNumber() + actionData.quantity * 0.00001;

    await prisma.stock.update({
      where: {
        id: stock.id,
      },
      data: {
        price_impact_factor: newPriceImpactFactor,
        currentPrice: newPrice,
      },
    });

    return transaction;
  } else {
    return null;
  }
};
