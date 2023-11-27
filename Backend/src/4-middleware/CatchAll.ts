import { Request, Response, NextFunction, response } from "express";
import StatusCode from "../3-models/status-codes";

function catchAll(err: any, req: Request, res: Response, next: NextFunction): void {
    // console.log("ERROR " + err.message);
    const status = err.status? err.status : StatusCode.InternalServerError;
    res.status(status).send(err.message);
}
export default catchAll