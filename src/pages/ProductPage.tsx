import { Link, useLocation } from "react-router-dom";
import ProductFeatureList from "../components/ProductFeatureList";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import useCart from "../stores/cart-store";
import { useEffect, useRef, useState } from "react";
import AddComment from "../components/AddComment";
import ProductComments from "../components/ProductComments";
import RelatedProducts from "../components/RelatedProducts";
import Loading from "../components/Loading";
import ProductStars from "../components/ProductStars";
import useFavoriteProducts from "../stores/favoriteProduct-store";
import useSingleProduct from "../hooks/useSingleProduct";
import getImage from "../utils/get-image";
import { FaPlus } from "react-icons/fa6";

const ProductPage = () => {
  const { likeProduct, disLikeProduct } = useFavoriteProducts();
  const addProduct = useCart((state) => state.addProduct);
  const [content, setContent] = useState("comments");
  const qtyRef = useRef<HTMLSelectElement>(null);
  const location = useLocation();
  const { data: product, isLoading } = useSingleProduct();
  const [inCart, setInCart] = useState(false);

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
          src={getImage(product!.image)}
          alt={product?.name}
        />
      </div>
      <div className="col-span-4 md:col-span-2 flex flex-col justify-between items-start gap-7 relative">
        {product?.isFavorite ? (
          <BsHeartFill
            className="absolute top-2 left-2 z-10 cursor-pointer text-secondary"
            onClick={() => disLikeProduct(product?._id)}
          />
        ) : (
          <BsHeart
            className="absolute top-2 left-2 z-10 cursor-pointer"
            onClick={() => likeProduct(product!)}
          />
        )}
        <p>{product?.name}</p>
        <p className="text-sm leading-7">{product?.description}</p>
        <span className="text-2xl">
          {product?.price.toLocaleString()} تومان
        </span>
        <ProductFeatureList product={product!} />
        <div className="flex items-center gap-14">
          <ProductStars rate={product?.rating || 1} />
          <div className="flex items-center gap-2">
            {inCart && (
              <FaPlus
                size={24}
                className="cursor-pointer"
                onClick={() => {
                  addProduct(product!, {
                    _id: product?._id,
                    name: product?.name,
                    qty: parseInt(qtyRef.current?.value || "1"),
                  });
                }}
              />
            )}
            <select
              ref={qtyRef}
              className="select select-bordered select-xs w-full max-w-xs"
            >
              {[1, 2, 3, 4, 5].map((number) => (
                <option key={number}>{number}</option>
              ))}
            </select>
          </div>
        </div>

        {!inCart && (
          <button
            className="btn btn-secondary text-xs btn-sm"
            onClick={() => {
              addProduct(product!, {
                _id: product?._id,
                name: product?.name,
                qty: parseInt(qtyRef.current?.value || "1"),
              });
              setInCart(true);
            }}
          >
            افزودن به سبد خرید
          </button>
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
        {content === "add-comment" && <AddComment />}
        {content === "comments" && <ProductComments />}
        {content === "related-products" && <RelatedProducts />}
      </div>
    </div>
  );
};

export default ProductPage;
