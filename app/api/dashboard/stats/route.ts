import { NextResponse } from 'next/server';

function validateTenant(headers: Headers) {
  const shopId = headers.get('x-shop-id');
  if (!shopId) return null;
  return shopId;
}

export async function GET(request: Request) {
  const shopId = validateTenant(request.headers);
  if (!shopId) return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });

  // For Demo Readiness, delivering realistic metrics per requirement
  return NextResponse.json({
    success: true,
    data: {
      totalSalesToday: 52450,
      monthlyProfit: 182000,
      lowStockItems: 6,
      activeCustomers: 312
    }
  });
}
