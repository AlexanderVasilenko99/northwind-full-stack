import { Request, Response, NextFunction } from "express";
import { RouteNotFound } from "../3-models/error-models";

function routeNotFound(req: Request, res: Response, next: NextFunction): void {
    console.log(req.originalUrl);
    
    const err = new RouteNotFound(req.originalUrl)
    next(err)
}
export default routeNotFound;