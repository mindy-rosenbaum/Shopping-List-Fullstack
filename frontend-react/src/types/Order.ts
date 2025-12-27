import { type OrderItem } from './OrderItem';

export interface Order {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  items: OrderItem[];
  totalAmount: number;
  date: Date;
}