import { Link, Outlet, useParams } from "react-router-dom";
import useProducts from "../stores/products-store";
import ProductFeatureList from "../components/ProductFeatureList";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import ProductStars from "../components/ProductStars";
import useCart from "../stores/cart-store";

const ProductPage = () => {
  const { id } = useParams();
  const { products, likeProduct } = useProducts();
  const addProduct = useCart((state) => state.addProduct);

  const product = products.find(
    (product) => product.id === parseInt(id || "1")
  );

  return (
    <div className="grid grid-cols-4 grid-rows-subgrid gap-14">
      <div className="col-span-4 md:col-span-2 bg-base-300 rounded-lg h-96"></div>
      <div className="col-span-4 md:col-span-2 flex flex-col justify-between items-start gap-7 relative">
        {product?.isFavorite ? (
          <BsHeartFill
            className="absolute top-2 left-2 z-10 cursor-pointer text-secondary"
            onClick={() => likeProduct(product?.id || 0)}
          />
        ) : (
          <BsHeart
            className="absolute top-2 left-2 z-10 cursor-pointer"
            onClick={() => likeProduct(product?.id || 0)}
          />
        )}
        <p>{product?.title}</p>
        <p>{product?.description}</p>
        <span className="text-2xl">
          {product?.price.toLocaleString()} تومان
        </span>
        <ProductFeatureList product={product!} />
        <div className="flex items-center gap-14">
          <ProductStars rate={product?.rate || 1} />
          <select className="select select-bordered select-xs w-full max-w-xs">
            {[1, 2, 3, 4, 5].map((number) => (
              <option key={number}>{number}</option>
            ))}
          </select>
        </div>
        <button
          className="btn btn-secondary text-xs btn-sm"
          onClick={() => addProduct(product!)}
        >
          افزودن به سبد خرید
        </button>
      </div>
      <div className="col-span-4 md:col-span-1 flex flex-col gap-7">
        <Link className="text-sm" to={"add-comment"}>
          ثبت نظر
        </Link>
        <Link className="text-sm" to={"comments"}>
          مشاهده نظرات
        </Link>
        <Link className="text-sm" to={"related-products"}>
          محصولات مرتبط
        </Link>
      </div>
      <div className="col-span-4 md:col-span-3">
        <Outlet />
      </div>
    </div>
  );
};

export default ProductPage;