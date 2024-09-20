import { create } from "zustand";
import { ProductEntity } from "../types/product-entity";
import { ShippingEntity } from "../types/shipping-entity";

interface CartStore {
  cartProducts: ProductEntity[];
  shippingInfo: ShippingEntity | undefined;
  addProduct: (product: ProductEntity) => void;
  deleteProduct: (id: number) => void;
  addShippingInfo: (information: ShippingEntity) => void;
}

const useCart = create<CartStore>((set) => ({
  cartProducts: [],
  shippingInfo: undefined,
  addProduct: (product) =>
    set((state) => ({ cartProducts: [...state.cartProducts, product] })),
  deleteProduct: (id) =>
    set((state) => ({
      cartProducts: state.cartProducts.filter(
        (cartProduct) => cartProduct.id !== id
      ),
    })),
  addShippingInfo: (information) => set(() => ({ shippingInfo: information })),
}));

export default useCart;
