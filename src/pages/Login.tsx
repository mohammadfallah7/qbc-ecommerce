import { useForm } from "react-hook-form";
import authLight from "../assets/images/auth-light.png";
import authDark from "../assets/images/auth-dark.png";
import useTheme from "../stores/theme-store";
import { Link } from "react-router-dom";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const theme = useTheme((state) => state.theme);
  const { register, handleSubmit, reset } = useForm<LoginFormData>();

  return (
    <div className="grid grid-cols-2 gap-14">
      <div className="col-span-2 md:col-span-1">
        <h2 className="text-xl mb-5">ورود</h2>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            reset();
          })}
        >
          <label className="form-control w-full mb-3">
            <div className="label">
              <span className="label-text">ایمیل</span>
            </div>
            <input
              {...register("email")}
              type="email"
              placeholder="ایمیل خود را وارد نمایید"
              className="input input-bordered text-sm"
            />
          </label>
          <label className="form-control w-full mb-3">
            <div className="label">
              <span className="label-text">رمز عبور</span>
            </div>
            <input
              {...register("password")}
              type="password"
              placeholder="رمز عبور خود را وارد نمایید"
              className="input input-bordered text-sm"
            />
          </label>

          <button className="btn btn-secondary">ورود</button>
        </form>
        <div className="flex items-center gap-2 mt-5 text-sm">
          <span>عضو نیستید؟</span>
          <Link to={"/register"} className="text-secondary underline">
            ثبت نام
          </Link>
        </div>
      </div>
      <figure className="col-span-2 md:col-span-1">
        <img src={theme === "light" ? authLight : authDark} alt="Auth" />
      </figure>
    </div>
  );
};

export default Login;
