import { IoCaretBack } from "react-icons/io5";
import Loading from "../components/Loading";
import useProducts from "../hooks/useProducts";
import { getDate } from "../utils/get-date";
import { Link } from "react-router-dom";

const AllProduct = () => {
  const { data: products, isLoading } = useProducts();

  if (isLoading) return <Loading />;

  return (
    <div className="grid grid-cols-2 gap-14 px-14">
      {products?.map((product) => (
        <div
          key={product._id}
          className="flex gap-5 bg-base-300 card card-compact flex-row p-5"
        >
          {/* image */}
          <div className="w-36 bg-base-100">
            <img src="" alt="" />
          </div>
          {/* image */}
          <div className="flex flex-col w-full gap-5">
            <div className="flex items-center w-full justify-between">
              <h2>{product.name}</h2>
              <span>{getDate(product.createdAt)}</span>
            </div>
            <p>{product.description}</p>
            <div className="flex items-center w-full justify-between">
              <div className="flex gap-2">
                <Link to={`/products/${product._id}?content=add-comment`}>
                  <button className="btn btn-secondary btn-sm text-xs">
                    مشاهده بیشتر
                    <IoCaretBack />
                  </button>
                </Link>
                <Link to={`/edit-product/${product._id}`}>
                  <button className="btn btn-secondary btn-sm text-xs">
                    ویرایش محصول
                  </button>
                </Link>
              </div>

              <span>{product.price.toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProduct;
