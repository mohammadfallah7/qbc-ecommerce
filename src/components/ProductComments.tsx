import ProductStars from "../components/ProductStars";
import useComments from "../stores/comment-store";

const ProductComments = () => {
  const comments = useComments((state) => state.comments);

  return comments.length > 0 ? (
    <div>
      {comments.map((comment) => (
        <div
          className="bg-base-200 rounded-md my-5 p-4 flex justify-between gap-4"
          key={comment.id}
        >
          <div className="flex flex-col gap-3">
            <span className="text-sm">{comment.author}</span>
            <p>{comment.title}</p>
            <ProductStars rate={comment.rate} />
          </div>
          <span className="text-sm">
            {comment.date.getHours()}:{comment.date.getMinutes()}
          </span>
        </div>
      ))}
    </div>
  ) : (
    <p>نظری برای این محصول وجود ندارد.</p>
  );
};

export default ProductComments;
