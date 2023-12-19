/* eslint-disable no-console */
import Product from '@/types/product.type';

export const getProducts = async (url: string): Promise<Product[]> => {
  try {
    const requestUrl = `${url}/products`;
    console.log(requestUrl);
    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
