import { type Order, type CreateOrderResult } from '../types.js';
import { OrderRepository } from '../repositories/OrderRepository.js';

export class OrderService {
    constructor(private readonly orderRepository: OrderRepository) {}

    async createOrder(orderData: Order): Promise<CreateOrderResult> {
        // Basic validation
        this.validateOrderData(orderData);
        const result = await this.orderRepository.create(orderData);
        return {
            id: result.id,
            message: "Order created successfully",
            createdAt: new Date()
        };
    }

    private validateOrderData(orderData: Order): void {
        if (!orderData.firstName?.trim()) {
            throw new Error('First name is required');
        }
        if (!orderData.lastName?.trim()) {
            throw new Error('Last name is required');
        }
        if (!orderData.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!orderData.address?.trim()) {
            throw new Error('Address is required');
        }
        if (!orderData.items?.length) {
            throw new Error('At least one item is required');
        }
    }
}