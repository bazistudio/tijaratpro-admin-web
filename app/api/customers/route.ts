import { NextResponse } from 'next/server';

function validateTenant(headers: Headers) {
  const shopId = headers.get('x-shop-id');
  if (!shopId) return null;
  return shopId;
}

// In-memory simple database for Phase 2 Mock
export let customersDb: any[] = [
  { id: "c_1", name: "Ahmed Trader", email: "ahmed@example.com", phone: "0300-1111111", type: "wholesale", status: "active", shopId: "demo-shop-id" },
  { id: "c_2", name: "Bilal Store", email: "bilal@example.com", phone: "0300-2222222", type: "retail", status: "active", shopId: "demo-shop-id" }
];

export async function GET(request: Request) {
  const shopId = validateTenant(request.headers);
  if (!shopId) return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });
  const customers = customersDb.filter(c => c.shopId === shopId);
  return NextResponse.json({ success: true, data: customers });
}

export async function POST(request: Request) {
  const shopId = validateTenant(request.headers);
  if (!shopId) return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });
  try {
    const body = await request.json();
    const newCustomer = { ...body, id: `c_${Math.random().toString(36).substr(2, 9)}`, shopId };
    customersDb.push(newCustomer);
    return NextResponse.json({ success: true, data: newCustomer });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
