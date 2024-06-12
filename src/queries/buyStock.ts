import { Stock, TransactionType } from "@prisma/client";
import { prisma } from "../helpers/connection";
import { ActionModel } from "../models/buy";

export const buyStock = async (actionData: ActionModel, stock: Stock) => {
  const updatedPortfolio = await prisma.portfolio.update({
    where: {
      userId: actionData.userId,
    },
    data: {
      wallet: {
        decrement: actionData.totalAmount,
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
        transactionType: TransactionType.BUY,
      },
    });

    await prisma.stockOnPortfolio.upsert({
      where: {
        stockId_portfolioId: {
          portfolioId: updatedPortfolio.id,
          stockId: stock.id,
        },
      },
      update: {
        quantity: {
          increment: actionData.quantity,
        },
      },
      create: {
        quantity: actionData.quantity,
        portfolioId: updatedPortfolio.id,
        stockId: stock.id,
      },
    });

    const newPrice =
      stock.currentPrice.toNumber() +
      stock.price_impact_factor.toNumber() * actionData.quantity;

    const newPriceImpactFactor =
      stock.price_impact_factor.toNumber() - actionData.quantity * 0.00001;

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
