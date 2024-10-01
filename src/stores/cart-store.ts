import { create } from "zustand";
import { ShippingEntity } from "../types/shipping-entity";
import { ProductModel } from "../types/product.model";
import { OrderItemPayload } from "../types/order-item-payload.model";

interface CartStore {
  cartProducts: ProductModel[];
  orderItems: OrderItemPayload[];
  shippingInfo: ShippingEntity | undefined;
  addProduct: (product: ProductModel, orderItem: OrderItemPayload) => void;
  deleteProduct: (id: string) => void;
  addShippingInfo: (information: ShippingEntity) => void;
  clearCart: () => void;
  // OrderedProduct: ProductEntity[];
  // addToOrdered: () => void;
}

const useCart = create<CartStore>((set) => ({
  cartProducts: [],
  orderItems: [],
  // OrderedProduct: [],
  shippingInfo: undefined,
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
  addShippingInfo: (information) => set(() => ({ shippingInfo: information })),
  clearCart: () => set(() => ({ cartProducts: [], orderItems: [] })),
  // addToOrdered: () =>
  //   set((state) => ({
  //     OrderedProduct: [...state.OrderedProduct, ...state.cartProducts],
  //   })),
}));

export default useCart;
