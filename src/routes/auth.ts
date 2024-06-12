import { loginController, registerController } from "../controllers/auth";
import { Router } from "express";

const authRoutes: Router = Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);

export default authRoutes;
