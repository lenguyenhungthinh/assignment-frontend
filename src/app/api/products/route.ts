/* eslint-disable @typescript-eslint/no-unused-vars */
import { getProducts } from '@/fetch/products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiUrl =  process.env.API_URL;
  if (typeof apiUrl !== 'string') {
    throw new Error('API_URL is not set');
  }
  const products = await getProducts(apiUrl);
  return NextResponse.json(products);
}
