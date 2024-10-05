import ProductSlide from "./ProductSlide";
import useNewProducts from "../hooks/useNewProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const ProductSlider = () => {
  const { data: newProducts } = useNewProducts();

  return (
    <Swiper modules={[Autoplay]} spaceBetween={28} autoplay>
      {newProducts?.map((product) => (
        <SwiperSlide key={product._id}>
          <ProductSlide product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
