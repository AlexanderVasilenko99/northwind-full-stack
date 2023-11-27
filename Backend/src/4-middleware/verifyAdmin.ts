import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";

function verifyAdmin(req: Request, res: Response, next: NextFunction): void {
    const authorization = req.header("authorization"); //bearer my-token

    const token = authorization?.substring(7);

    cyber.verifyAdmin(token);
    next();
}
export default verifyAdmin;