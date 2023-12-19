type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  largeImage?: string;
  discount?: number;
  discountAmount?: number;
};

export default Product;
