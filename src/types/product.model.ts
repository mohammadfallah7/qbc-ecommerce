import { ReviewModel } from "./review.model";

export type ProductModel = {
  _id: string;
  name: string;
  image: string;
  quantity: number;
  category: string;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  reviews: ReviewModel[];
  createdAt: string;
  updatedAt: string;
};
