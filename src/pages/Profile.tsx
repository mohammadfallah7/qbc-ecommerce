import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import useUser from "../stores/user-store";

type ProfileFormData = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>();

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
    reset();
  };
  const { user } = useUser();

  if (user) {
    reset({
      name: user.name,
      email: user.email,
      password: user.password,
      repeatPassword: user.password,
    });
  }

  return (
    <div className="w-2/3">
      <h2 className="text-lg mb-5">بروزرسانی پروفایل</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="نام"
          error={errors.name}
          useFormRegister={register("name", { required: true })}
          value={user?.name}
        />
        <Input
          label="ایمیل"
          type="email"
          error={errors.email}
          useFormRegister={register("email", { required: true })}
          value={user?.email}
        />
        <Input
          label="رمز عبور"
          type="password"
          placeholder="رمز عبور خود را وارد کنید"
          error={errors.password}
          useFormRegister={register("password", { required: true })}
          value={user?.password}
        />
        <Input
          label="تکرار رمز عبور"
          type="password"
          placeholder="رمز عبور خود را دوباره وارد کنید"
          error={errors.repeatPassword}
          useFormRegister={register("repeatPassword", { required: true })}
        />

        <div className="flex justify-between items-center mt-5">
          <Link to={"/"} className="btn btn-secondary btn-sm text-xs">
            سفارشات من
          </Link>
          <button type="submit" className="btn btn-secondary btn-sm text-xs">
            بروزرسانی
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
