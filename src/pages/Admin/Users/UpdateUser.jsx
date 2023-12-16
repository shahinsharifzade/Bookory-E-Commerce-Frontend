import React, { useEffect, useState } from "react";
import {
  useChangeActiveStatus,
  useChangeRole,
  useGetAllRoles,
} from "../../../service/userService";
import LoadingSpinner from "../../../components/ui/Loading/LoadingSpinner";

const UpdateUser = ({ user, handleClose }) => {
  const { data: roles, loadingRoles } = useGetAllRoles();

  const { mutate: changeActiveStatus, isLoading: loadingActiveStatus } =
    useChangeActiveStatus();
  const { mutate: changeRole, isLoading: loadingRole } = useChangeRole();

  const handleChangeStatus = () => {
    changeActiveStatus(user.user.id, {
      onSuccess: () => handleClose(),
    });
  };

  if (loadingActiveStatus || loadingRoles || loadingRole)
    return (
      <LoadingSpinner
        isLoading={loadingActiveStatus || loadingRoles || loadingRole}
      />
    );

  return (
    <div className="container z-10 mb-16 mt-32 max-w-[600px] rounded-[3rem] bg-white py-8">
      <h2 className="pb-8 text-center text-[4rem] text-black">Update user</h2>

      {user.user.isActive ? (
        <div
          className="active:shadow-x mx-auto my-8 flex cursor-pointer items-center rounded-[2rem] bg-green-600 px-16 py-6 text-xl text-white active:scale-95"
          onClick={handleChangeStatus}
        >
          <p className="mx-auto text-2xl font-medium">Block</p>
        </div>
      ) : (
        <div
          className="active:shadow-x cursor-pointerl mx-auto my-8 flex items-center rounded-[2rem] bg-primaryText px-16 py-6 text-xl text-white active:scale-95"
          onClick={handleChangeStatus}
        >
          <p className="mx-auto text-2xl font-medium">Unblock</p>
        </div>
      )}

      <div>
        <div className="w-full py-8 ">
          <div className="ml-4 py-4 text-2xl">Current Role : {user.role}</div>
          <select
            name="roles"
            id="roles"
            className="w-full cursor-pointer rounded-3xl bg-secondaryText px-8 py-8 text-2xl focus:outline-none"
            onChange={(e) =>
              changeRole(
                { userId: user.user.id, roleId: e.target.value },
                {
                  onSuccess: () => handleClose(),
                },
              )
            }
          >
            <option>Roles</option>
            {roles &&
              roles.map((role) => {
                return (
                  <option className="cursor-pointer" value={role.id}>
                    {role.name}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
