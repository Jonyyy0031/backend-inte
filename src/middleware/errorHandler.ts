import { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/errors/errors";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof AppError) {
        res.status(err.httpStatus).json({
            code: err.code,
            message: err.message,
            details: err.details,
        });
    } else {
        console.error("Unexpected error:", err);
        res.status(500).json({
            message: "An unexpected error occurred.",
            code: 500,
        });
    }
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({
        message: "Resource not found.",
        code: 404,
    });
}