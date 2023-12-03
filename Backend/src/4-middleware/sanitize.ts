import { NextFunction, Request, Response } from "express";
import stripTags from "striptags"
function sanitize(req: Request, res: Response, next: NextFunction): void {

    for (const prop in req.body) {
        if (typeof req.body[prop] === "string") stripTags(req.body[prop]);
    }
    next();
}
export default sanitize;