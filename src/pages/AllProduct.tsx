import Loading from "../components/Loading";
import useProducts from "../hooks/useProducts";
import { getDate } from "../utils/get-date";
import { Link } from "react-router-dom";
import getImage from "../utils/get-image";
import Warning from "../components/Warning";

const AllProduct = () => {
  const { data: products, isLoading } = useProducts();

  if (products?.length === 0) return <Warning title="هیچ محصولی وجود ندارد" />;

  if (isLoading) return <Loading />;

  return (
    <div className="grid grid-cols-2 gap-14">
      {products?.map((product) => (
        <div
          key={product._id}
          className="flex gap-7 bg-base-300 rounded-lg flex-row p-5"
        >
          <div className="w-36 h-28 bg-base-100 rounded overflow-hidden">
            <img
              src={getImage(product.image)}
              alt={product.name}
              className="object-cover w-full"
            />
          </div>
          <div className="flex flex-col w-full gap-5">
            <div className="flex items-center w-full justify-between">
              <h2>{product.name}</h2>
              <span className="text-sm">{getDate(product.createdAt)}</span>
            </div>
            <p className="text-sm">{product.description}</p>
            <div className="flex items-center w-full justify-between">
              <div className="flex gap-2">
                <Link to={`/products/${product._id}?content=add-comment`}>
                  <button className="btn btn-secondary btn-xs text-xs">
                    مشاهده بیشتر
                  </button>
                </Link>
                <Link to={`/edit-product/${product._id}`}>
                  <button className="btn btn-secondary btn-xs text-xs">
                    ویرایش محصول
                  </button>
                </Link>
              </div>

              <span className="text-sm">
                {product.price.toLocaleString()} تومان
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProduct;
