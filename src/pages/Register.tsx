import { useForm } from "react-hook-form";
import authLight from "../assets/images/auth-light.png";
import authDark from "../assets/images/auth-dark.png";
import useTheme from "../stores/theme-store";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../stores/user-store";
import useNavItem from "../stores/nav-item-store";
import { useEffect } from "react";
import Input from "../components/Input";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const Register = () => {
  const changeNavItem = useNavItem((state) => state.changeNavItem);
  const theme = useTheme((state) => state.theme);
  const { register, handleSubmit, reset } = useForm<RegisterFormData>();
  const registerUser = useUser((state) => state.register);
  const navigate = useNavigate();

  useEffect(() => {
    changeNavItem("register");
  });

  const onSubmit = (data: RegisterFormData) => {
    if (data.password === data.repeatPassword) {
      registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        isAdmin: false,
      });
      navigate("/");
      reset();
    }
  };

  return (
    <div className="grid grid-cols-2 gap-14 items-center">
      <div className="col-span-2 order-2 sm:order-1 md:col-span-1">
        <h2 className="text-xl mb-5">ثبت نام</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="نام"
            placeholder="محمد فلاح"
            value="محمد فلاح"
            useFormRegister={register("name")}
          />
          <Input
            label="ایمیل"
            placeholder="test@gmail.com"
            type="email"
            value="mohammad@gmail.com"
            useFormRegister={register("email")}
          />
          <Input
            label="رمز عبور"
            placeholder="12345678"
            type="password"
            value="12345678"
            useFormRegister={register("password")}
          />
          <Input
            label="تکرار رمز عبور"
            placeholder="12345678"
            type="password"
            value="12345678"
            useFormRegister={register("repeatPassword")}
          />

          <button className="btn btn-secondary">ثبت نام</button>
        </form>
        <div className="flex items-center gap-2 mt-5 text-sm">
          <span>عضو هستید؟</span>
          <Link to={"/login"} className="text-secondary underline">
            ورود
          </Link>
        </div>
      </div>
      <figure className="col-span-2 order-1 sm:order-2 md:col-span-1">
        <img src={theme === "light" ? authLight : authDark} alt="Auth" />
      </figure>
    </div>
  );
};

export default Register;
