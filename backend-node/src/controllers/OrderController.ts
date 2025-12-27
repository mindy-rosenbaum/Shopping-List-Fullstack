import { type Request, type Response } from 'express';
import { OrderService } from '../services/OrderService.js';
import { type ApiResponse, type CreateOrderResult } from '../types.js';

export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    createOrder = async (req: Request, res: Response): Promise<void> => {
        try {
            const result: CreateOrderResult = await this.orderService.createOrder(req.body);
            const response: ApiResponse<CreateOrderResult> = {
                success: true,
                data: result
            };
            
            res.status(201).json(response);
        } catch (error: any) {
            const errorResponse: ApiResponse = {
                success: false,
                error: error.message || "Internal Server Error"
            };
            const statusCode = error.message.includes('required') ? 400 : 500;
            res.status(statusCode).json(errorResponse);
        }
    };
}