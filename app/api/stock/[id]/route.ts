import { NextResponse } from 'next/server';
import { updateProductInDb } from '../../products/db'; // adjust path to db

function validateTenant(headers: Headers) {
  const shopId = headers.get('x-shop-id');
  if (!shopId) return null;
  return shopId;
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const shopId = validateTenant(request.headers);
  if (!shopId) return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });

  try {
    const body = await request.json(); // { quantity: 15 }
    
    // We update the underlying product's currentStock
    const updated = updateProductInDb(shopId, params.id, { currentStock: body.quantity });
    
    if (!updated) {
        return NextResponse.json({ error: 'Item not found', success: false }, { status: 404 });
    }

    const qty = updated.currentStock || 0;
    const thresh = updated.minStockLevel || 5;

    return NextResponse.json({
      success: true,
      data: {
        id: updated.id,
        productId: updated.id,
        name: updated.name,
        quantity: qty,
        lowStockThreshold: thresh,
        status: qty <= thresh ? "LOW" : "OK"
      }
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
