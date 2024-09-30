import { Link, useLocation, useParams } from "react-router-dom";
import ProductFeatureList from "../components/ProductFeatureList";
// import { BsHeart, BsHeartFill } from "react-icons/bs";
// import useCart from "../stores/cart-store";
import { useEffect, useState } from "react";
import AddComment from "../components/AddComment";
import ProductComments from "../components/ProductComments";
import RelatedProducts from "../components/RelatedProducts";
import Loading from "../components/Loading";
import ProductStars from "../components/ProductStars";

import useProducts from "../hooks/useProducts";

const ProductPage = () => {
  // const { likeProduct } = useProducts();
  // const addProduct = useCart((state) => state.addProduct);
  const { id } = useParams();
  const location = useLocation();
  const [content, setContent] = useState("comments");
  const [inCart, setInCart] = useState(false);
  const { data: products, isLoading } = useProducts();
  const product = products?.find((product) => product._id === id);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const content = queryParams.get("content")!;
    setContent(content);
  }, [location.search]);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-4 grid-rows-subgrid gap-14">
      <div className="col-span-4 md:col-span-2 bg-base-300 rounded-lg overflow-hidden h-96">
        <img
          className="object-cover w-full h-full"
          src={product?.image}
          alt={product?.name}
        />
      </div>
      <div className="col-span-4 md:col-span-2 flex flex-col justify-between items-start gap-7 relative">
        {/* {product?.isFavorite ? (
          <BsHeartFill
            className="absolute top-2 left-2 z-10 cursor-pointer text-secondary"
            onClick={() => likeProduct(product?.id || 0)}
          />
        ) : (
          <BsHeart
            className="absolute top-2 left-2 z-10 cursor-pointer"
            onClick={() => likeProduct(product?.id || 0)}
          />
        )} */}
        <p>{product?.name}</p>
        <p>{product?.description}</p>
        <span className="text-2xl">
          {product?.price.toLocaleString()} تومان
        </span>
        <ProductFeatureList product={product!} />
        <div className="flex items-center gap-14">
          <ProductStars rate={product?.rating || 1} />
          <select className="select select-bordered select-xs w-full max-w-xs">
            {[1, 2, 3, 4, 5].map((number) => (
              <option key={number}>{number}</option>
            ))}
          </select>
        </div>
        {!inCart ? (
          <button
            className="btn btn-secondary text-xs btn-sm"
            onClick={() => {
              // addProduct(product!);
              setInCart(true);
            }}
          >
            افزودن به سبد خرید
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <label className="mr-2">تعداد:</label>
            <select className="select select-bordered select-xs w-full max-w-xs">
              {[1, 2, 3, 4, 5].map((number) => (
                <option key={number}>{number}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="col-span-4 md:col-span-1 flex flex-col gap-7">
        <Link
          className="text-sm"
          to={`/products/${product?._id}?content=add-comment`}
        >
          ثبت نظر
        </Link>
        <Link
          className="text-sm active:font-bold"
          to={`/products/${product?._id}?content=comments`}
        >
          مشاهده نظرات
        </Link>
        <Link
          className="text-sm"
          to={`/products/${product?._id}?content=related-products`}
        >
          محصولات مرتبط
        </Link>
      </div>
      <div className="col-span-4 md:col-span-3">
        {content === "add-comment" && <AddComment id={product?._id} />}
        {content === "comments" && <ProductComments id={product?._id} />}
        {content === "related-products" && <RelatedProducts />}
      </div>
    </div>
  );
};

export default ProductPage;
