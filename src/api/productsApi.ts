import { Product } from '../features/products/types';

// Функция для загрузки списка продуктов
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products');
  console.log(response);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};
