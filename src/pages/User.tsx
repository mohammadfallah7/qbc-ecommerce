import { FaTrash } from "react-icons/fa6";
import useUser from "../stores/user-store";
import { PiCheckFatFill } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import { BiEditAlt } from "react-icons/bi";

const User = () => {
  const { users, deleteUser } = useUser();
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
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <div className="flex items-center gap-1">
                  <BiEditAlt className="cursor-pointer" />
                  {user.name}
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
                  onClick={() => deleteUser(user.id)}
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
