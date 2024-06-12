import { registerUser } from "../controllers/auth";
import { Router } from "express";

const userRoutes: Router = Router();

userRoutes.post("/register", registerUser);

export default userRoutes;
