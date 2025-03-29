import { Request, Response, NextFunction } from "express";
import { getScreener } from "../services/screener";

export class ScreenerController {
  async getScreener(req: Request, res: Response, next: NextFunction) {
    try {
      const screener = await getScreener();
      res.json(screener);
    } catch (error) {
      next(error);
    }
  }
}

export const screenerController = new ScreenerController();
