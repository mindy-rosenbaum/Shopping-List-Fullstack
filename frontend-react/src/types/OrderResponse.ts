export interface OrderResponse {
  success: boolean;
  data?: {
    id: string;
    message: string;
    createdAt: Date;
  };
  error?: string;
}