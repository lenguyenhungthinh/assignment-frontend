import { NextRequest, NextResponse } from 'next/server';

const data = [
  {
    id: 1,
    siCode: 'ABC123',
    description: 'First item',
    createdDate: '2023-10-24',
  },
  {
    id: 2,
    siCode: 'DEF456',
    description: 'Second item',
    createdDate: '2023-10-25',
  },
  // Add more data objects as needed
];

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id') as string;
  if (typeof id === 'string') {
    const index = parseInt(id, 10);
    if (!isNaN(index)) {
      const returnData = data.find((item) => item.id === index);
      return NextResponse.json(returnData);
    }
  }
  return NextResponse.json(data);
}
