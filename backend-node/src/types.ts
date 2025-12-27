export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    items: OrderItem[];
    totalAmount: number;
    date?: Date;
}

export interface CreateOrderResult {
    id: string;
    message: string;
    createdAt: Date;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}