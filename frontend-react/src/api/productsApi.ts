import axios, { type AxiosResponse } from 'axios';
import { type Product } from '../types';

const API_URL = '/api/products';

export const fetchProducts = (categoryId?: string | number): Promise<AxiosResponse<Product[]>> => {
  const url = categoryId ? `${API_URL}?categoryId=${categoryId}` : API_URL;
  return axios.get<Product[]>(url);
};