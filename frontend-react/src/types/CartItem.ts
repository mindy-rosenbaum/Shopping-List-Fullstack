export interface CartItem {
  productId: number;
  productName: string;
  categoryName: string;
  pricePerUnit: number;
  quantity: number;
  totalPrice: number;
}