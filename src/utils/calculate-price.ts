import { shippingPrice } from "./constants";

export const taxPrice = (price: number) => price * 0.1;

export const finalPrice = (price: number) =>
  price + taxPrice(price) + shippingPrice;
