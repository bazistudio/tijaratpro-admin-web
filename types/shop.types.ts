export type ShopStatus = "active" | "inactive" | "suspended";

export interface Shop {
  _id: string;
  name: string;
  slug: string;
  owner: string; // User _id
  ownerName?: string;
  email?: string;
  phone?: string;
  address?: string;
  status: ShopStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateShopPayload {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  owner: string;
}

export interface UpdateShopPayload {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface ToggleShopStatusPayload {
  status: ShopStatus;
}
