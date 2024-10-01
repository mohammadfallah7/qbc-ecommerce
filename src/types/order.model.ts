import { OrderItem } from "./order-item.model";
import { ShippingAddress } from "./shipping-address.model";

export type OrderModel = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
  user: string;
  isDelivered: boolean;
  shippingAddress: ShippingAddress;
  isPaid: boolean;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
