import { Router } from "express";
import { getPortfolioController } from "../controllers/portfolio";

const portfolioRoutes: Router = Router();

portfolioRoutes.get("/", getPortfolioController);

export default portfolioRoutes;
