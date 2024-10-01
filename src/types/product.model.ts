import { CategoryModel } from "./category.model";
import { ReviewModel } from "./review.model";

export type ProductModel = {
  _id: string;
  name: string;
  image: string;
  quantity: number;
  category?: CategoryModel;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  reviews: ReviewModel[];
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
};
