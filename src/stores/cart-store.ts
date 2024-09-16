import { create } from "zustand";
import { ProductEntity } from "../types/product-entity";

interface CartStore {
  cartProducts: ProductEntity[];
  addProduct: (product: ProductEntity) => void;
  deleteProduct: (id: number) => void;
}

const useCart = create<CartStore>((set) => ({
  cartProducts: [],
  addProduct: (product) =>
    set((state) => ({ cartProducts: [...state.cartProducts, product] })),
  deleteProduct: (id) =>
    set((state) => ({
      cartProducts: state.cartProducts.filter(
        (cartProduct) => cartProduct.id !== id
      ),
    })),
}));

export default useCart;
