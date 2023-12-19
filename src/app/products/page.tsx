'use client';
import { useGetProducts } from '@/hooks/useGetProducts';
import classes from './page.module.scss';
import Product from '@/types/product.type';
import classNames from 'classnames';

export default function Home() {
  const { data, isLoading } = useGetProducts();

  const dataTable = isLoading ? (
    <div>Loading...</div>
  ) : (
    <Products products={data} />
  );
  return (
    <main className={classes['main']}>
      {dataTable}
    </main>
  );
}

type Props = {
  products: Product[] | undefined;
};

function Products({ products }: Props) {
  return (
    <div className={classNames(classes['products'],'grid grid-cols-3 gap-10')}>
      {products?.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-4" />
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p className="text-gray-500 mb-2">${product.price}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
