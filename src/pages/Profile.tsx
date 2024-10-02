import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/api-client";

type ProfileFormData = {
  username: string;
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
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user } = useUser();
  const { mutate } = useMutation({
    mutationKey: ["update-user-profile"],
    mutationFn: (data: ProfileFormData) =>
      apiClient.put("/users/profile", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
  });
  const onSubmit = (data: ProfileFormData) => {
    mutate(data);
    reset();
  };

  return (
    <div className="w-2/3">
      <h2 className="text-lg mb-5">بروزرسانی پروفایل</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="نام"
          error={errors.username}
          useFormRegister={register("username", { required: true })}
          defaultValue={user?.username}
        />
        <Input
          label="ایمیل"
          type="email"
          error={errors.email}
          useFormRegister={register("email", { required: true })}
          defaultValue={user?.email}
        />
        <Input
          label="رمز عبور"
          type="password"
          placeholder="رمز عبور جدید خود را وارد کنید"
          error={errors.password}
          useFormRegister={register("password", { required: true })}
        />
        <Input
          label="تکرار رمز عبور"
          type="password"
          placeholder="رمز عبور جدید خود را دوباره وارد کنید"
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
