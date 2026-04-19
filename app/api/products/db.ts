import { Product } from '@/types';

// In-memory simple database for Phase 2 Mock
export let productsDb: Product[] = [
  {
    id: "p_1",
    name: "Samsung A12 LCD",
    sku: "SAM-A12-LCD",
    barcode: "1000000000001",
    categoryId: "cat_lcd",
    brandId: "brd_samsung",
    price: 4500,
    cost: 3200,
    currentStock: 45,
    minStockLevel: 10,
    maxStockLevel: 200,
    status: "active",
    type: "standard",
    shopId: "demo-shop-id",
  },
  {
    id: "p_2",
    name: "iPhone 11 Battery",
    sku: "APL-I11-BAT",
    barcode: "1000000000002",
    categoryId: "cat_battery",
    brandId: "brd_apple",
    price: 3200,
    cost: 1800,
    currentStock: 32,
    minStockLevel: 10,
    maxStockLevel: 100,
    status: "active",
    type: "standard",
    shopId: "demo-shop-id",
  },
  {
    id: "p_3",
    name: "Oppo A5 Charging Jack",
    sku: "OPP-A5-JACK",
    barcode: "1000000000003",
    categoryId: "cat_parts",
    brandId: "brd_oppo",
    price: 450,
    cost: 120,
    currentStock: 28,
    minStockLevel: 30, // Trigger low stock
    maxStockLevel: 100,
    status: "active",
    type: "standard",
    shopId: "demo-shop-id",
  },
  {
    id: "p_4",
    name: "Redmi Note 10 Back Panel",
    sku: "XIA-RN10-BK",
    barcode: "1000000000004",
    categoryId: "cat_body",
    brandId: "brd_xiaomi",
    price: 1200,
    cost: 650,
    currentStock: 21,
    minStockLevel: 10,
    maxStockLevel: 50,
    status: "active",
    type: "standard",
    shopId: "demo-shop-id",
  },
  {
    id: "p_5",
    name: "Vivo Y20 Touch Glass",
    sku: "VIV-Y20-GLS",
    barcode: "1000000000005",
    categoryId: "cat_lcd",
    brandId: "brd_vivo",
    price: 850,
    cost: 350,
    currentStock: 15,
    minStockLevel: 10,
    maxStockLevel: 50,
    status: "active",
    type: "standard",
    shopId: "demo-shop-id",
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
