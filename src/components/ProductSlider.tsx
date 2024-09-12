import { FaStar } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { IoCart, IoTime } from "react-icons/io5";
import ProductFeature from "./ProductFeature";

const ProductSlider = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-base-300 w-full rounded-lg overflow-hidden h-56"></div>
      <div className="grid grid-cols-2 gap-7">
        <div className="flex flex-col gap-3">
          <p>Apple iPhone 14 Pro</p>
          <div className="flex self-end">
            <p>10000</p>
            <span>تومان</span>
          </div>
          <p>
            آیفون 14 پرو دارای صفحه نمایش 6.1 اینچی Super Retina XDR است صفحه
            نمایش با فناوری ProMotion، تراشه A16 Bionic و سیستم دوربین سه گانه
            ...
          </p>
        </div>
        <div className="grid grid-cols-2 grid-rows-3">
          <ProductFeature icon={<FaStar />} name="امتیاز" value="5" />
          <ProductFeature icon={<FaShop />} name="برند" value="اپل" />
          <ProductFeature icon={<IoCart />} name="تعداد" value="52" />
          <ProductFeature icon={<IoTime />} name="بروزرسانی" value="اخیرا" />
          <ProductFeature icon={<FaShop />} name="موجودی" value="10" />
          <ProductFeature icon={<FaStar />} name="نظرات" value="420" />
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
