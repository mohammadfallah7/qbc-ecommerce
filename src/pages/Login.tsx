import { useForm } from "react-hook-form";
import authLight from "../assets/images/auth-light.png";
import authDark from "../assets/images/auth-dark.png";
import useTheme from "../stores/theme-store";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../stores/user-store";
import useNavItem from "../stores/nav-item-store";
import { useEffect } from "react";
import Input from "../components/Input";
import apiClient from "../api/api-client";
import { LoginResponse } from "../types/login-response";

export type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const changeNavItem = useNavItem((state) => state.changeNavItem);
  const theme = useTheme((state) => state.theme);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const { login } = useUser();

  useEffect(() => {
    changeNavItem("login");
  });

  const onSubmit = (data: LoginFormData) => {
    apiClient
      .post<LoginFormData, LoginResponse>("/users/auth", data)
      .then(({ data }) => {
        console.log("response", data);
        login(data._id, data.isAdmin);
        navigate("/");
      });
    reset();
  };

  return (
    <div className="grid grid-cols-2 gap-14 items-center">
      <div className="col-span-2 order-2 sm:order-1 md:col-span-1">
        <h2 className="text-xl mb-5">ورود</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            error={errors.email}
            label="ایمیل"
            placeholder="ایمیل خود را وارد کنید"
            type="email"
            value="gp1@qbc.com"
            useFormRegister={register("email", {
              required: true,
              minLength: 3,
            })}
          />
          {errors.email?.type === "required" && (
            <p className="text-error text-sm">این فیلد اجباری است</p>
          )}
          {errors.email?.type === "minlength" && (
            <p className="text-error text-sm">حداقل باید 3 کاراکتر باشد.</p>
          )}
          <Input
            error={errors.password}
            label="رمز عبور"
            placeholder="رمز عبور خود را وارد کنید"
            type="password"
            value="Group1"
            useFormRegister={register("password", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />
          {errors.password?.type === "required" && (
            <p className="text-error text-sm">این فیلد اجباری است.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-error text-sm">حداقل باید 6 کارکتر باشد</p>
          )}
          {errors.password?.type === "maxLength" && (
            <p className="text-error text-sm">حداکثر باید 12 کارکتر باشد</p>
          )}

          <button className="btn btn-secondary mt-5">ورود</button>
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
