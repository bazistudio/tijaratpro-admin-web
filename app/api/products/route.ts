import { NextResponse } from 'next/server';
import { getProductsByShop, addProductToDb } from './db';

// Mandatory tenant validation wrapper (pseudo-middleware for routes)
function validateTenant(headers: Headers) {
  const shopId = headers.get('x-shop-id');
  if (!shopId) {
    return null;
  }
  return shopId;
}

export async function GET(request: Request) {
  const shopId = validateTenant(request.headers);
  if (!shopId) {
    return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });
  }

  // Extract query parameters (for pagination/filters)
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  
  let products = getProductsByShop(shopId);

  if (search) {
      products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));
  }

  // Standardize the API return shape as defined in the frontend
  return NextResponse.json({
    success: true,
    data: products,
    meta: {
      total: products.length,
      page: 1,
      limit: 10,
      pages: 1
    }
  });
}

export async function POST(request: Request) {
  const shopId = validateTenant(request.headers);
  if (!shopId) {
    return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newProduct = addProductToDb(shopId, body);

    return NextResponse.json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
