import { getProducts } from '@/api/rest/getProduct';
import Product from '@/types/product.type';
import { useAppQuery } from '@/utils/hooks/useAppQuery';

export const GET_PRODUCTS = 'GET_PRODUCTS';

export const useGetProducts = () => {
  const { data, error, isLoading } = useAppQuery<[typeof GET_PRODUCTS, ...string[]], Product[]>({
    queryKey: [GET_PRODUCTS],
    queryFn() {
      return getProducts();
    },
    enabled: true,
  });

  return {
    data,
    isLoading,
    error,
  };
};
