import { Request, Response } from "express";
import { badRequest, serverError, ok } from "../helpers/response";
import { getPortfolioByUserId } from "../queries/getPortfolioByUserId";
import { ActionModel } from "../models/buy";
import { getStockById } from "../queries/getStockById";
import { buyStock } from "../queries/buyStock";
import { getPortfolioStockByStockIdAndPortfolioId } from "../queries/getPortfolioStockByStockIdAndPortfolioId";
import { sellStock } from "../queries/sellStock";

export const buyStockController = async (req: Request, res: Response) => {
  const actionData: ActionModel = req.body;

  if (
    actionData.stockId === undefined ||
    actionData.userId === undefined ||
    actionData.quantity === undefined
  ) {
    return badRequest(res, "Please provide stockId, userId and quantity");
  }

  try {
    const stock = await getStockById(actionData.stockId);

    if (stock === null) {
      return badRequest(
        res,
        "Stock not found. Please provide a valid stock id"
      );
    }

    const portfolio = await getPortfolioByUserId(actionData.userId);

    if (portfolio === null) {
      return badRequest(res, "Portfolio not found");
    }

    const totalAmount = stock.currentPrice.toNumber() * actionData.quantity;

    const balanceControl = portfolio.wallet - totalAmount;

    if (balanceControl < 0) {
      return badRequest(res, "Insufficient balance");
    } else {
      actionData.totalAmount = totalAmount;

      const transaction = await buyStock(actionData, stock);

      if (transaction) {
        return ok(res, transaction);
      } else {
        return badRequest(res, "Stock could not be bought");
      }
    }
  } catch (error) {
    return serverError(res);
  }
};

export const sellStockController = async (req: Request, res: Response) => {
  const actionData: ActionModel = req.body;

  if (
    actionData.stockId === undefined ||
    actionData.userId === undefined ||
    actionData.quantity === undefined
  ) {
    return badRequest(res, "Please provide stockId, userId and quantity");
  }

  try {
    const stock = await getStockById(actionData.stockId);

    if (stock === null) {
      return badRequest(
        res,
        "Stock not found. Please provide a valid stock id"
      );
    }

    const portfolio = await getPortfolioByUserId(actionData.userId);

    if (portfolio === null) {
      return badRequest(res, "Portfolio not found");
    }

    const portfolioStock = await getPortfolioStockByStockIdAndPortfolioId(
      portfolio.id,
      stock.id
    );

    if (portfolioStock === null) {
      return badRequest(res, "Stock not found in portfolio");
    }

    if (portfolioStock.quantity < actionData.quantity) {
      return badRequest(res, "Insufficient stock");
    } else {
      const totalAmount = stock.currentPrice.toNumber() * actionData.quantity;
      actionData.totalAmount = totalAmount;

      const transaction = await sellStock(actionData, stock);

      if (transaction) {
        return ok(res, transaction);
      } else {
        return badRequest(res, "Stock could not be selled");
      }
    }
  } catch (error) {
    return serverError(res);
  }
};
