import { NextFunction, Request, Response } from "express";
import logger from "../2-utils/logger";

function activities(req: Request, res: Response, next: NextFunction): void {
    const now = new Date();
    const activity = `Time: ${now.toLocaleTimeString()}
                        Method: ${req.method}
                        Route: ${req.originalUrl}
                        Body: ${JSON.stringify(req.body)}`

    logger.logActivity(activity)

    next();
}
export default activities;