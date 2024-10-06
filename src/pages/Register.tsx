import { useForm } from "react-hook-form";
import authLight from "../assets/images/auth-light.png";
import authDark from "../assets/images/auth-dark.png";
import useTheme from "../stores/theme-store";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../stores/user-store";
import useNavItem from "../stores/nav-item-store";
import { useEffect } from "react";
import Input from "../components/Input";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { AuthResponse } from "../types/login-response";
import Warning from "../components/Warning";

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirm_Password: string;
};

const Register = () => {
  const changeNavItem = useNavItem((state) => state.changeNavItem);
  const theme = useTheme((state) => state.theme);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const login = useUser((state) => state.login);
  const navigate = useNavigate();
  const { error, mutate, isPending } = useMutation<
    AuthResponse,
    Error,
    RegisterFormData
  >({
    mutationKey: ["register"],
    mutationFn: (data: RegisterFormData) =>
      apiClient.post("/users", data).then((response) => {
        console.log(response.data);
        navigate("/");
        login(response.data._id, response.data.isAdmin);
        return response.data;
      }),
  });

  useEffect(() => {
    changeNavItem("register");
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
    reset();
  };

  return (
    <div className="grid grid-cols-2 gap-14 items-center relative">
      {error && (
        <Warning
          title={error.message}
          className="absolute top-0 right-0 w-1/2 alert-error"
        />
      )}
      <div className="col-span-2 order-2 sm:order-1 md:col-span-1">
        <h2 className="text-xl mb-5">ثبت نام</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            error={errors.username}
            label="نام"
            placeholder="نام خود را وارد کنید"
            useFormRegister={register("username", {
              required: true,
              minLength: 3,
            })}
          />
          {errors.username?.type === "required" && (
            <p className="text-error text-sm">این فیلد اجباری است.</p>
          )}
          {errors.username?.type === "minLength" && (
            <p className="text-error text-sm">حداقل باید 3 کارکتر باشد</p>
          )}
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
            <p className="text-error text-sm">این فیلد اجباری است.</p>
          )}
          {errors.email?.type === "minLength" && (
            <p className="text-error text-sm">حداقل باید 3 کارکتر باشد</p>
          )}
          <Input
            error={errors.password}
            label="رمز عبور"
            placeholder="رمز عبور خود را وارد کنید"
            type="password"
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
          {errors.password?.type === "maxLength " && (
            <p className="text-error text-sm">حداکثر باید 12 کارکتر باشد</p>
          )}
          <Input
            error={errors.confirm_Password}
            label="تکرار رمز عبور"
            placeholder="رمز عبور خود را دوباره وارد کنید"
            type="password"
            useFormRegister={register("confirm_Password", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />
          {errors.confirm_Password?.type === "required" && (
            <p className="text-error text-sm">این فیلد اجباری است.</p>
          )}
          {errors.confirm_Password?.type === "minLength" && (
            <p className="text-error text-sm">حداقل باید 6 کارکتر باشد</p>
          )}
          {errors.confirm_Password?.type === "maxLength " && (
            <p className="text-error text-sm">حداکثر باید 12 کارکتر باشد</p>
          )}

          <button className="btn btn-secondary mt-5">
            ثبت نام
            {isPending && (
              <span className="loading loading-ring loading-xs"></span>
            )}
          </button>
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
