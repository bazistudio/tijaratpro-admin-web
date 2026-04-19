import { NextResponse } from 'next/server';
import { updateProductInDb, deleteProductFromDb } from '../db'; // Go up one directory to reach db.ts

function validateTenant(headers: Headers) {
  const shopId = headers.get('x-shop-id');
  if (!shopId) {
    return null;
  }
  return shopId;
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const shopId = validateTenant(request.headers);
  if (!shopId) {
    return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updatedProduct = updateProductInDb(shopId, params.id, body);
    
    if (!updatedProduct) {
        return NextResponse.json({ error: 'Product not found', success: false }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const shopId = validateTenant(request.headers);
  if (!shopId) {
    return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });
  }

  const deleted = deleteProductFromDb(shopId, params.id);
  
  if (!deleted) {
      return NextResponse.json({ error: 'Product not found', success: false }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    message: "Product deleted successfully",
    data: null,
  });
}
