import { type CartItem } from './CartItem';

export interface CartState {
  items: CartItem[];
  totalAmount: number;
}