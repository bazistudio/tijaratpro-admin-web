import { NextResponse } from 'next/server';

function validateTenant(headers: Headers) {
  const shopId = headers.get('x-shop-id');
  if (!shopId) return null;
  return shopId;
}

export let salesDb: any[] = [
  { id: "s_1", total: 1000, items: 3, status: "completed", shopId: "demo-shop-id" },
];

export async function GET(request: Request) {
  const shopId = validateTenant(request.headers);
  if (!shopId) return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });
  const sales = salesDb.filter(s => s.shopId === shopId);
  return NextResponse.json({ success: true, data: sales });
}

export async function POST(request: Request) {
  const shopId = validateTenant(request.headers);
  if (!shopId) return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });
  try {
    const body = await request.json();
    const newSale = { ...body, id: `s_${Math.random().toString(36).substr(2, 9)}`, shopId };
    salesDb.push(newSale);
    return NextResponse.json({ success: true, data: newSale });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
