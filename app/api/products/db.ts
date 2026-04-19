import { Product } from '@/types';

// In-memory simple database for Phase 2 Mock
export let productsDb: Product[] = [
  {
    id: "p_1",
    name: "MacBook Pro 16",
    sku: "MBP-16-M3",
    barcode: "1234567890123",
    categoryId: "cat_electronics",
    brandId: "brd_apple",
    price: 2499,
    cost: 1800,
    currentStock: 15,
    minStockLevel: 5,
    maxStockLevel: 50,
    status: "active",
    type: "standard",
    shopId: "demo-shop-id", // Tenant tied
  },
  {
    id: "p_2",
    name: "Wireless Mouse",
    sku: "LOGI-MX-3",
    barcode: "9876543210987",
    categoryId: "cat_accessories",
    brandId: "brd_logitech",
    price: 99,
    cost: 45,
    currentStock: 4, // low stock testing
    minStockLevel: 10,
    maxStockLevel: 100,
    status: "active",
    type: "standard",
    shopId: "demo-shop-id", // Tenant tied
  }
];

export function getProductsByShop(shopId: string) {
  return productsDb.filter(p => p.shopId === shopId);
}

export function addProductToDb(shopId: string, productData: Partial<Product>) {
  const newProduct: Product = {
    ...productData,
    id: `p_${Math.random().toString(36).substr(2, 9)}`,
    shopId,
  } as Product;
  productsDb.push(newProduct);
  return newProduct;
}

export function updateProductInDb(shopId: string, id: string, productData: Partial<Product>) {
  const index = productsDb.findIndex(p => p.id === id && p.shopId === shopId);
  if (index === -1) return null;
  productsDb[index] = { ...productsDb[index], ...productData };
  return productsDb[index];
}

export function deleteProductFromDb(shopId: string, id: string) {
  const index = productsDb.findIndex(p => p.id === id && p.shopId === shopId);
  if (index === -1) return false;
  productsDb.splice(index, 1);
  return true;
}
