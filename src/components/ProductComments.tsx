import ProductStars from "../components/ProductStars";
import useSingleProduct from "../hooks/useSingleProduct";
import { getDate } from "../utils/get-date";

const ProductComments = () => {
  const { data: product } = useSingleProduct();

  return product?.reviews.length === 0 ? (
    <p className="text-sm">هیچ نظری برای این محصول وجود ندارد</p>
  ) : (
    <div>
      {product?.reviews.map((review) => (
        <div
          className="bg-base-200 rounded-md my-5 p-4 flex justify-between gap-4"
          key={review._id}
        >
          <div className="flex flex-col gap-3">
            <span className="text-sm">{review.name}</span>
            <p>{review.comment}</p>
            <ProductStars rate={review.rating} />
          </div>
          <span className="text-sm">{`${new Date(
            review.createdAt
          ).getHours()}:${new Date(review.createdAt).getMinutes()} ${getDate(
            review.createdAt
          )}`}</span>
        </div>
      ))}
    </div>
  );
};

export default ProductComments;
