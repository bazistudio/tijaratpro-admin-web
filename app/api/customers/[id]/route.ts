import { NextResponse } from 'next/server';
import { customersDb } from '../route';

function validateTenant(headers: Headers) {
  const shopId = headers.get('x-shop-id');
  if (!shopId) return null;
  return shopId;
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const shopId = validateTenant(request.headers);
  if (!shopId) return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });
  
  try {
    const body = await request.json();
    const index = customersDb.findIndex(c => c.id === params.id && c.shopId === shopId);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    customersDb[index] = { ...customersDb[index], ...body };
    return NextResponse.json({ success: true, data: customersDb[index] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const shopId = validateTenant(request.headers);
  if (!shopId) return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });
  
  const index = customersDb.findIndex(c => c.id === params.id && c.shopId === shopId);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  
  customersDb.splice(index, 1);
  return NextResponse.json({ success: true, data: null });
}
