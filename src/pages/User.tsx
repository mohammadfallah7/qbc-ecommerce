import { FaTrash } from "react-icons/fa6";
import useUser from "../stores/user-store";
import { PiCheckFatFill } from "react-icons/pi";
import { CgClose } from "react-icons/cg";

const User = () => {
  const { users, deleteUser } = useUser();
  return (
    <div className="overflow-x-auto">
      <table className="table mt-14">
        {/* head */}
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
            <tr>
              <th>{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
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
