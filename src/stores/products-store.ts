import { create } from "zustand";
import { ProductEntity } from "../types/product-entity";

interface ProductsStore {
  products: ProductEntity[];
  likeProduct: (id: number) => void;
}

const useProducts = create<ProductsStore>((set) => ({
  products: [
    {
      id: 1,
      title: "Title 1",
      description: "Description 1",
      price: 10_000,
      rate: 5,
      brand: "Apple",
      count: 10,
      update: new Date(1999),
      isFavorite: false,
      comments: 3,
    },
    {
      id: 2,
      title: "Title 2",
      description: "Description 2",
      price: 20_000,
      rate: 4,
      brand: "Samsung",
      count: 15,
      update: new Date(2003),
      isFavorite: false,
      comments: 6,
    },
    {
      id: 3,
      title: "Title 3",
      description: "Description 3",
      price: 15_000,
      rate: 5,
      brand: "LG",
      count: 7,
      update: new Date(2023),
      isFavorite: false,
      comments: 96,
    },
    {
      id: 4,
      title: "Title 4",
      description: "Description 4",
      price: 7_000,
      rate: 2,
      brand: "Apple",
      count: 36,
      update: new Date(2015),
      isFavorite: false,
      comments: 5,
    },
    {
      id: 5,
      title: "Title 5",
      description: "Description 5",
      price: 34_000,
      rate: 4,
      brand: "Apple",
      count: 13,
      update: new Date(2010),
      isFavorite: false,
      comments: 13,
    },
    {
      id: 6,
      title: "Title 6",
      description: "Description 6",
      price: 63_000,
      rate: 5,
      brand: "Apple",
      count: 6,
      update: new Date(2020),
      isFavorite: false,
      comments: 5,
    },
  ],
  likeProduct: (id) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      ),
    })),
}));

export default useProducts;
