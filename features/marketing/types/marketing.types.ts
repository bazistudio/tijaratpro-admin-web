export interface Salesman {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'on-field';
  currentLocation?: {
    lat: number;
    lng: number;
    lastUpdated: string;
  };
  metrics: {
    totalOrders: number;
    totalRevenue: number;
    shopsVisitedToday: number;
  };
}

export interface Visit {
  id: string;
  salesmanId: string;
  shopId: string;
  shopName: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'completed' | 'in-progress' | 'pending';
  notes?: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface FieldOrder {
  id: string;
  orderNumber: string;
  salesmanId: string;
  shopId: string;
  shopName: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'delivered';
  createdAt: string;
}

export interface Route {
  id: string;
  name: string;
  salesmanId: string;
  assignedDays: string[];
  stops: Array<{
    shopId: string;
    shopName: string;
    order: number;
  }>;
}
