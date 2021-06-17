import { createContext, FC, useContext, useState } from "react";
import { UserClientForm, UserListState } from "../types";

const contextDefaultValues: UserListState = {
  userList: [],
  setUserList: () => {},
};

export const UserListContext =
  createContext<UserListState>(contextDefaultValues);

const UserListProvider: FC = ({ children }) => {
  const [userList, setUserList] = useState<UserClientForm[]>(
    contextDefaultValues.userList
  );

  return (
    <UserListContext.Provider value={{ userList, setUserList }}>
      {children}
    </UserListContext.Provider>
  );
};

export function useUserList() {
  const context = useContext(UserListContext);
  const { userList, setUserList } = context;
  return { userList, setUserList };
}

export default UserListProvider;
