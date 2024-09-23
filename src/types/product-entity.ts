export type ProductEntity = {
  id: number;
  title: string;
  description: string;
  price: number;
  rate: number;
  brand: string;
  count: number;
  isFavorite: boolean;
  update: Date;
  comments: number;
  ispaid?: boolean;
  shippingStatus?: "sent" | "in_progress" | "not_sent";
};
