import { Router } from "express";
import { buyStockController, sellStockController } from "../controllers/stock";

const stockRoutes: Router = Router();

stockRoutes.post("/buy", buyStockController);
stockRoutes.post("/sell", sellStockController);

export default stockRoutes;
