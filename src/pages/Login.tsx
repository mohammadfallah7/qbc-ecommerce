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
import { useMutation } from "@tanstack/react-query";
import Warning from "../components/Warning";
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
  const { mutate, error, isPending } = useMutation<
    LoginResponse,
    Error,
    LoginFormData
  >({
    mutationKey: ["login"],
    mutationFn: (data: LoginFormData) =>
      apiClient.post("/users/auth", data).then((response) => {
        navigate("/");
        login(response.data._id, response.data.isAdmin);
        return response.data;
      }),
  });

  useEffect(() => {
    changeNavItem("login");
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
    reset();
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-14 items-center relative">
        {error && (
          <Warning
            title={error.message}
            className="absolute top-0 right-0 w-1/2 alert-error"
          />
        )}
        <div className="col-span-2 order-2 sm:order-1 md:col-span-1">
          <h2 className="text-xl mb-5">ورود</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              error={errors.email}
              label="ایمیل"
              placeholder="ایمیل خود را وارد کنید"
              type="email"
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

            <button className="btn btn-secondary mt-5">
              ورود
              {isPending && (
                <span className="loading loading-ring loading-xs"></span>
              )}
            </button>
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
    </>
  );
};

export default Login;
