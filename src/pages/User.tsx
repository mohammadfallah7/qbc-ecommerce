import { FaTrash } from "react-icons/fa6";
import { PiCheckFatFill } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import { BiEditAlt } from "react-icons/bi";
import useUsers from "../hooks/useUsers";
import useDeleteUser from "../hooks/useDeleteUser";
import Loading from "../components/Loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/api-client";
import { IoCheckbox } from "react-icons/io5";
import { useState } from "react";

const User = () => {
  const { data: users, isLoading } = useUsers();
  const { mutate } = useDeleteUser();
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const queryClient = useQueryClient();

  const { mutate: updateUser } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: (id: string) =>
      apiClient.put("/users/" + id, {
        username: newUsername,
        email: newEmail,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

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
                <div className="flex items-center gap-3">
                  {editUsername === user._id ? (
                    <IoCheckbox
                      className="text-lg text-success cursor-pointer"
                      onClick={() => {
                        setEditUsername("");
                        updateUser(user._id);
                      }}
                    />
                  ) : (
                    <BiEditAlt
                      className="cursor-pointer"
                      onClick={() => {
                        setEditUsername(user._id);
                      }}
                    />
                  )}
                  {editUsername === user._id ? (
                    <input
                      className="input input-bordered text-sm"
                      defaultValue={user.username}
                      onChange={(e) => {
                        setNewUsername(e.target.value);
                      }}
                    />
                  ) : (
                    user.username
                  )}
                </div>
              </td>
              {/* /////////////// */}
              <td>
                <div className="flex items-center gap-3">
                  {editEmail === user._id ? (
                    <IoCheckbox
                      className="text-lg text-success cursor-pointer"
                      onClick={() => {
                        setEditEmail("");
                        updateUser(user._id);
                      }}
                    />
                  ) : (
                    <BiEditAlt
                      onClick={() => {
                        setEditEmail(user._id);
                      }}
                      className="cursor-pointer"
                    />
                  )}
                  {editEmail === user._id ? (
                    <input
                      className="input input-bordered text-sm"
                      defaultValue={user.email}
                      onChange={(e) => {
                        setNewEmail(e.target.value);
                      }}
                    />
                  ) : (
                    user.email
                  )}
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
