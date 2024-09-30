import { FaTrash } from "react-icons/fa6";
import { PiCheckFatFill } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import { BiEditAlt } from "react-icons/bi";
import useUsers from "../hooks/useUsers";
import useDeleteUser from "../hooks/useDeleteUser";
import Loading from "../components/Loading";

const User = () => {
  const { data: users, isLoading } = useUsers();
  const { mutate } = useDeleteUser();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>نام</th>
            <th>ایمیل</th>
            <th>ادمین</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>
                <div className="flex items-center gap-1">
                  <BiEditAlt className="cursor-pointer" />
                  {user.username}
                </div>
              </td>
              <td>
                <div className="flex items-center gap-1">
                  <BiEditAlt className="cursor-pointer" />
                  {user.email}
                </div>
              </td>
              <td>
                {user.isAdmin ? (
                  <PiCheckFatFill className="text-success" />
                ) : (
                  <CgClose className="text-error" />
                )}
              </td>
              <td>
                <FaTrash
                  onClick={() => mutate(user._id)}
                  className="text-error cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
