import { createContext, FC, useContext, useEffect, useState } from "react";
import { UserClientForm, UserFormState } from "../types";

export const contextDefaultValues: UserFormState = {
  userClientForm: {
    name: "",
    cnpj: "",
    phone: "",
    email: "",
    cep: "",
    city: "",
    company: "",
    tradingName: "",
    street: "",
    complement: "",
    lastName: "",
    neighborhood: "",
    number: 0,
    password: "",
    state: "",
  },
  setUserClientForm: () => {},
};

export const UserClientFormProvider =
  createContext<UserFormState>(contextDefaultValues);

const UserFormClientProvider: FC = ({ children }) => {
  const [userClientForm, setUserClientForm] = useState<UserClientForm>(
    contextDefaultValues.userClientForm
  );

  useEffect(() => {
    console.log("contextUseEffect", userClientForm);
  }, [userClientForm]);

  return (
    <UserClientFormProvider.Provider
      value={{ userClientForm, setUserClientForm }}
    >
      {children}
    </UserClientFormProvider.Provider>
  );
};

export function useClientForm() {
  const context = useContext(UserClientFormProvider);
  const { userClientForm, setUserClientForm } = context;
  return { userClientForm, setUserClientForm };
}

export default UserFormClientProvider;
