import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import ProductSlide from "./ProductSlide";
import "swiper/css";
import useNewProducts from "../hooks/useNewProducts";

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
