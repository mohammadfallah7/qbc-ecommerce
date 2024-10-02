import { create } from "zustand";
import { ProductModel } from "../types/product.model";
import { OrderItemPayload } from "../types/order-item-payload.model";

interface CartStore {
  cartProducts: ProductModel[];
  orderItems: OrderItemPayload[];
  addProduct: (product: ProductModel, orderItem: OrderItemPayload) => void;
  deleteProduct: (id: string) => void;
  clearCart: () => void;
}

const useCart = create<CartStore>((set) => ({
  cartProducts: [],
  orderItems: [],
  addProduct: (product, orderItem) =>
    set((state) => ({
      cartProducts: [...state.cartProducts, product],
      orderItems: [...state.orderItems, orderItem],
    })),
  deleteProduct: (id: string) =>
    set((state) => ({
      cartProducts: state.cartProducts.filter(
        (cartProduct) => cartProduct._id !== id
      ),
      orderItems: state.orderItems.filter((orderItem) => orderItem._id !== id),
    })),
  clearCart: () => set(() => ({ cartProducts: [], orderItems: [] })),
}));

export default useCart;
