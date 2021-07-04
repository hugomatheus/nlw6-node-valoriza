import { NextFunction, Request, Response } from "express";

export function ensureAdminMiddleware(request: Request, response: Response, next: NextFunction) {
  const admin = true;
  
  if(admin){
    return next();
  }

  return response.status(401).json({ error: 'User unauthorized'});
}