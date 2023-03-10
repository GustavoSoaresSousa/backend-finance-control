import { AuthService } from "../service/auth";
import { NextFunction, Request, Response } from "express";

export function authMiddleware(req: Partial<Request>, res: Partial<Response>, next: NextFunction): void {
  try{
    const token = req.headers?.['x-access-token'];
    const authService = new AuthService();
    const decoded = authService.decodeToken(token as string);
    req.decoded = decoded;
  }catch(error){
    res.status?.(401).send({code: 401, error: (error as Error).message })
  }
  next();
}