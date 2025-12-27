import { type Request, type Response, type NextFunction } from 'express';

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Error:', error.message);
    
    res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
    });
};