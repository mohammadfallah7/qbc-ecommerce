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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>();
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
        isAdmin: true,
        id: Date.now(),
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
            error={errors.name}
            label="نام"
            placeholder="نام خود را وارد کنید"
            useFormRegister={register("name", { required: true, minLength: 3 })}
          />
          {errors.name?.type === "required" && (
            <p className="text-error text-sm">این فیلد اجباری است.</p>
          )}
          {errors.name?.type === "minLength" && (
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
              minLength: 8,
              maxLength: 12,
            })}
          />
          {errors.password?.type === "required" && (
            <p className="text-error text-sm">این فیلد اجباری است.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-error text-sm">حداقل باید 8 کارکتر باشد</p>
          )}
          {errors.password?.type === "maxLength " && (
            <p className="text-error text-sm">حداکثر باید 12 کارکتر باشد</p>
          )}
          <Input
            error={errors.repeatPassword}
            label="تکرار رمز عبور"
            placeholder="رمز عبور خود را دوباره وارد کنید"
            type="password"
            useFormRegister={register("repeatPassword", {
              required: true,
              minLength: 8,
              maxLength: 12,
            })}
          />
          {errors.repeatPassword?.type === "required" && (
            <p className="text-error text-sm">این فیلد اجباری است.</p>
          )}
          {errors.repeatPassword?.type === "minLength" && (
            <p className="text-error text-sm">حداقل باید 8 کارکتر باشد</p>
          )}
          {errors.repeatPassword?.type === "maxLength " && (
            <p className="text-error text-sm">حداکثر باید 12 کارکتر باشد</p>
          )}

          <button className="btn btn-secondary mt-5">ثبت نام</button>
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
