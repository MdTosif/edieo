import { Router } from "express";
import UserController from "../controllers/user";

const UserRoutes = Router();

UserRoutes.post("/signup", UserController.signup);
UserRoutes.post("/login", UserController.login);

export default UserRoutes;
