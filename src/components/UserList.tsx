import React from "react";
import { useUserList } from "../context/UserListProvider";
import SimpleAccordion from "./SimpleAccordion";

const UserList = () => {
  const { userList, setUserList } = useUserList();
  return (
    <div className="w-full px-8 pb-8">
      {userList?.length > 0 &&
        userList.map((user) => (
          <div className="mb-1">
            <SimpleAccordion user={user} />
          </div>
        ))}
    </div>
  );
};

export default UserList;
