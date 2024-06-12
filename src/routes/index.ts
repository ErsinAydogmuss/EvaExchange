import { Router } from "express";
import authRoutes from "./auth";
import portfolioRoutes from "./portfolio";
import stockRoutes from "./stock";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/portfolio", portfolioRoutes);
rootRouter.use("/stock", stockRoutes);

export default rootRouter;
