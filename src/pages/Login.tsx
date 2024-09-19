import { useForm } from "react-hook-form";
import authLight from "../assets/images/auth-light.png";
import authDark from "../assets/images/auth-dark.png";
import useTheme from "../stores/theme-store";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../stores/user-store";
import useNavItem from "../stores/nav-item-store";
import { useEffect } from "react";
import Input from "../components/Input";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const changeNavItem = useNavItem((state) => state.changeNavItem);
  const theme = useTheme((state) => state.theme);
  const { register, handleSubmit, reset } = useForm<LoginFormData>();
  const user = useUser((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    changeNavItem("login");
  });

  const onSubmit = (data: LoginFormData) => {
    if (user?.password === data.password && user.email === data.email) {
      navigate("/");
      reset();
    }
  };

  return (
    <div className="grid grid-cols-2 gap-14 items-center">
      <div className="col-span-2 order-2 sm:order-1 md:col-span-1">
        <h2 className="text-xl mb-5">ورود</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="ایمیل"
            placeholder="test@gmail.com"
            type="email"
            useFormRegister={register("email")}
          />
          <Input
            label="رمز عبور"
            placeholder="12345678"
            type="password"
            useFormRegister={register("password")}
          />

          <button className="btn btn-secondary">ورود</button>
        </form>
        <div className="flex items-center gap-2 mt-5 text-sm">
          <span>عضو نیستید؟</span>
          <Link to={"/register"} className="text-secondary underline">
            ثبت نام
          </Link>
        </div>
      </div>
      <figure className="col-span-2 order-1 sm:order-2 md:col-span-1">
        <img src={theme === "light" ? authLight : authDark} alt="Auth" />
      </figure>
    </div>
  );
};

export default Login;
