import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import useProducts from "../hooks/useProducts";
import ProductSlide from "./ProductSlide";
import "swiper/css";

const ProductSlider = () => {
  const { data: products } = useProducts();

  return (
    <Swiper modules={[Autoplay]} spaceBetween={28} autoplay>
      {products?.map((product) => (
        <SwiperSlide key={product._id}>
          <ProductSlide product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
