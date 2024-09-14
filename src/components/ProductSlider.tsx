import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import useProducts from "../stores/products-store";
import "swiper/css";
import ProductSlide from "./ProductSlide";

const ProductSlider = () => {
  const products = useProducts((state) => state.products);

  return (
    <Swiper modules={[Autoplay]} spaceBetween={28} autoplay>
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductSlide product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
