import { NextFunction, Request, Response } from "express";
import UserHelper from "../helper/user";

class UserController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserHelper.AddUser(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserHelper.authenticate(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
