import { NextResponse } from 'next/server';
import { getProductsByShop } from '../products/db';

function validateTenant(headers: Headers) {
  const shopId = headers.get('x-shop-id');
  if (!shopId) return null;
  return shopId;
}

export async function GET(request: Request) {
  const shopId = validateTenant(request.headers);
  if (!shopId) return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });

  const products = getProductsByShop(shopId);
  
  // Dynamic business logic calculation per requirement
  const stockItems = products.map(p => {
    const qty = p.currentStock || 0;
    const thresh = p.minStockLevel || 5;
    
    return {
      id: p.id,
      productId: p.id,
      name: p.name,
      sku: p.sku,
      cost: p.cost || 0,
      price: p.price || 0,
      quantity: qty,
      lowStockThreshold: thresh,
      status: qty <= thresh ? "LOW" : "OK"
    }
  });

  return NextResponse.json({ success: true, data: stockItems });
}
