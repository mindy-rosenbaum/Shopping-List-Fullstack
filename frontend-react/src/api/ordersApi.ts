import axios, { type AxiosResponse } from 'axios';
import { type Order, type OrderResponse } from '../types';

const API_URL = '/api/orders';

export const createOrder = (orderData: Order): Promise<AxiosResponse<OrderResponse>> => {
    return axios.post(API_URL, orderData);
};