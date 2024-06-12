import { Request, Response } from "express";
import { badRequest, serverError, ok } from "../helpers/response";
import { getPortfolioByUserId } from "../queries/getPortfolioByUserId";

export const getPortfolioController = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  try {
    const portfolio = await getPortfolioByUserId(userId);

    if (portfolio) {
      return ok(res, portfolio);
    } else {
      return badRequest(res, "Portfolio not found");
    }
  } catch (error) {
    return serverError(res);
  }
};
