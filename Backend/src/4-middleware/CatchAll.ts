import { Request, Response, NextFunction, response } from "express";
import StatusCode from "../3-models/status-codes";
import logger from "../2-utils/logger";
import appConfig from "../2-utils/app-config";

function catchAll(err: any, req: Request, res: Response, next: NextFunction): void {
    // console.log("ERROR " + err.message);

    // log the error
    logger.logError(err.message,err)

    const status = err.status || 500;
    const message = appConfig.isProduction && status >= 500? "something went wrong, try again later" : err.message;
    res.status(status).send(message);
}
export default catchAll