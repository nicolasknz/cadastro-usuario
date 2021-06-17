export type UserFormState = {
  userClientForm: UserClientForm;
  setUserClientForm: (userClientValues: UserClientForm) => void;
};

export type UserClientForm = {
  name: string;
  lastName: string;
  phone: string;
  password: string;
  cnpj: string;
  email: string;
  cep: string;
  street: string;
  city: string;
  complement: string;
  state: string;
  number: number;
  neighborhood: string;
  company: string; // Razão social
  tradingName: string; // Nome fantasia
};

export type ActiveStepState = {
  activeStep: number;
  setActiveStep: (newActiveStep: number) => void;
};

export type UserListState = {
  userList: UserClientForm[];
  setUserList: (user: UserClientForm[]) => void;
};

export type UserForm = {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};

export type ClientForm = {
  cnpj: string;
  email: string;
  cep: string;
  street: string;
  city: string;
  complement: string;
  state: string;
  number: number;
  neighborhood: string;
  company: string; // Razão social
  tradingName: string; // Nome fantasia
};

export type CepResponse = {
  cep: string;
  state: string;
  street: string;
  neighborhood: string;
  city: string;
};
