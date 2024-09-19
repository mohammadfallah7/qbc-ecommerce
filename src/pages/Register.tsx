import { useForm } from "react-hook-form";
import authLight from "../assets/images/auth-light.png";
import authDark from "../assets/images/auth-dark.png";
import useTheme from "../stores/theme-store";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../stores/user-store";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const Register = () => {
  const theme = useTheme((state) => state.theme);
  const { register, handleSubmit, reset } = useForm<RegisterFormData>();
  const registerUser = useUser((state) => state.register);
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-14">
      <div className="col-span-2 md:col-span-1">
        <h2 className="text-xl mb-5">ثبت نام</h2>
        <form
          onSubmit={handleSubmit((data) => {
            if (data.password === data.repeatPassword) {
              registerUser({
                name: data.name,
                email: data.email,
                password: data.password,
                isAdmin: false,
              });
              navigate("/login");
              reset();
            }
          })}
        >
          <label className="form-control w-full mb-3">
            <div className="label">
              <span className="label-text">نام</span>
            </div>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="نام خود را وارد نمایید"
              className="input input-bordered text-sm"
            />
          </label>
          <label className="form-control w-full mb-3">
            <div className="label">
              <span className="label-text">ایمیل</span>
            </div>
            <input
              {...register("email", { required: true })}
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
              {...register("password", { required: true })}
              type="password"
              placeholder="رمز عبور خود را وارد نمایید"
              className="input input-bordered text-sm"
            />
          </label>
          <label className="form-control w-full mb-3">
            <div className="label">
              <span className="label-text">تکرار رمز عبور</span>
            </div>
            <input
              {...register("repeatPassword", { required: true })}
              type="password"
              placeholder="رمز عبور خود را مجدد وارد نمایید"
              className="input input-bordered text-sm"
            />
          </label>

          <button className="btn btn-secondary">ثبت نام</button>
        </form>
        <div className="flex items-center gap-2 mt-5 text-sm">
          <span>عضو هستید؟</span>
          <Link to={"/login"} className="text-secondary underline">
            ورود
          </Link>
        </div>
      </div>
      <figure className="col-span-2 md:col-span-1">
        <img src={theme === "light" ? authLight : authDark} alt="Auth" />
      </figure>
    </div>
  );
};

export default Register;
