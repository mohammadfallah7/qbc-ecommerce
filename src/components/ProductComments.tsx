import ProductStars from "../components/ProductStars";
import useSingleProduct from "../hooks/useSingleProduct";
import { getDate } from "../utils/get-date";

interface IProductCommentsProps {
  id: string | undefined;
}

const ProductComments: React.FC<IProductCommentsProps> = ({ id }) => {
  const { data: product } = useSingleProduct(id!);

  return (
    <div>
      {product?.reviews.map((comment) => (
        <div
          className="bg-base-200 rounded-md my-5 p-4 flex justify-between gap-4"
          key={comment._id}
        >
          <div className="flex flex-col gap-3">
            <span className="text-sm">{comment.user}</span>
            <p>{comment.name}</p>
            <ProductStars rate={comment.rating} />
          </div>
          <span className="text-sm">{getDate(comment.createdAt)}</span>
        </div>
      ))}
    </div>
  );
};

export default ProductComments;
