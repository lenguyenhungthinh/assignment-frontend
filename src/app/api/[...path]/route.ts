/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiUrl =  process.env.API_URL;
  // Extract the full URL path from req.url
  const fullPath = req.url ?? '';

  // Split the path by '/'
  const parts = fullPath.split('/');

  // Find the index of 'api' in the path
  const apiIndex = parts.indexOf('api');

  // Extract the path segments after 'api'
  const path = parts.slice(apiIndex + 1).join('/');

  if (typeof apiUrl !== 'string') {
    throw new Error('API_URL is not set');
  }
  const results = await getDataFromServer(apiUrl + '/' + path);
  return NextResponse.json(results);
}

const getDataFromServer = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
