export interface ProductRelationForOrderItem {
  id: number;
  name: string;
  image?: string;
  price: number;
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: ProductRelationForOrderItem;
}

//main
export interface Order {
  id: number;
  total: number;
  phone: string;
  address: string;
  status: "PENDING" | "CONFIRMED" | "DELIVERING" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  items: OrderItem[];
}