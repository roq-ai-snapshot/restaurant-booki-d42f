import axios from 'axios';
import queryString from 'query-string';
import { GrocerieInterface, GrocerieGetQueryInterface } from 'interfaces/grocerie';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getGroceries = async (
  query?: GrocerieGetQueryInterface,
): Promise<PaginatedInterface<GrocerieInterface>> => {
  const response = await axios.get('/api/groceries', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createGrocerie = async (grocerie: GrocerieInterface) => {
  const response = await axios.post('/api/groceries', grocerie);
  return response.data;
};

export const updateGrocerieById = async (id: string, grocerie: GrocerieInterface) => {
  const response = await axios.put(`/api/groceries/${id}`, grocerie);
  return response.data;
};

export const getGrocerieById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/groceries/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGrocerieById = async (id: string) => {
  const response = await axios.delete(`/api/groceries/${id}`);
  return response.data;
};
