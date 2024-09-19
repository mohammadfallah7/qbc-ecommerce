import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { Link } from "react-router-dom";

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

  return (
    <div className="w-2/3">
      <h2 className="text-lg mb-5">بروزرسانی پروفایل</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="نام"
          placeholder="محمد فلاح"
          error={errors.name}
          useFormRegister={register("name", { required: true })}
        />
        <Input
          label="ایمیل"
          placeholder="test@gmail.com"
          type="email"
          error={errors.email}
          useFormRegister={register("email", { required: true })}
        />
        <Input
          label="رمز عبور"
          placeholder="12345678"
          type="password"
          error={errors.password}
          useFormRegister={register("password", { required: true })}
        />
        <Input
          label="تکرار رمز عبور"
          placeholder="12345678"
          type="password"
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
