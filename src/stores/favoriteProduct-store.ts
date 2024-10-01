import { create } from "zustand";
import { ProductModel } from "../types/product.model";

interface FavoriteProductsStore {
  products: ProductModel[];
  likeProduct: (product: ProductModel) => void;
  disLikeProduct: (id: string) => void;
}

const useFavoriteProducts = create<FavoriteProductsStore>((set) => ({
  products: [],
  likeProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  disLikeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    })),
}));
export default useFavoriteProducts;
