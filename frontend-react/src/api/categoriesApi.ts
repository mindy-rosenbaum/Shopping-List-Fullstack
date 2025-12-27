import axios, { type AxiosResponse } from 'axios';
import { type Category } from '../types';

const API_URL = '/api/categories';

export const fetchCategories = (): Promise<AxiosResponse<Category[]>> => {
  return axios.get<Category[]>(API_URL);
};