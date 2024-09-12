import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import SpecialProducts from "../components/SpecialProducts";
import useProducts from "../stores/products-store";
import useNavItem from "../stores/nav-item-store";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Home = () => {
  const products = useProducts((state) => state.products);
  const changeNavItem = useNavItem((state) => state.changeNavItem);
  const { pathname } = useLocation();

  useEffect(() => {
    changeNavItem(pathname.substring(1));
  });

  return (
    <div className="grid grid-cols-2 grid-rows-subgrid gap-14 items-center">
      <div className="col-span-2 md:col-span-1 grid md:grid-cols-2 md:grid-rows-2 gap-7">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="col-span-2 md:col-span-1">
        <Swiper modules={[Autoplay]} spaceBetween={28} autoplay>
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} showInSlider={true} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="col-span-2">
        <SpecialProducts products={products} />
      </div>
    </div>
  );
};

export default Home;
