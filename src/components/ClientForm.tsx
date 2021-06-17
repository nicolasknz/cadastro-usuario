import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useActiveStep } from "../context/ActiveStepProvider";
import {
  contextDefaultValues,
  useClientForm,
} from "../context/UserClientFormProvider";
import { CepResponse, ClientForm as ClientFormType } from "../types/index";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMasked from "./InputMasked";
import cep from "cep-promise";
import Input from "./Input";
import { useUserList } from "../context/UserListProvider";

interface ClientFormProps {
  stepsLength: number;
}

const schema = yup.object().shape({
  cep: yup.string().min(9, "CEP inválido").required("Campo obrigatório"),
  cnpj: yup.string().min(15, "CNPJ inválido").required("Campo obrigatório"),
  company: yup.string().required("Campo obrigatório"),
  tradingName: yup.string().required("Campo obrigatório"),
  street: yup.string().required("Campo obrigatório"),
  number: yup
    .number()
    .required("Campo obrigatório")
    .typeError("Número inválido"),
  complement: yup.string(),
  neighborhood: yup.string().required("Campo obrigatório"),
  city: yup.string().required("Campo obrigatório"),
  state: yup.string().required("Campo obrigatório"),
});

const ClientForm = ({ stepsLength }: ClientFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    getValues,
    register,
    clearErrors,
    watch,
  } = useForm<ClientFormType>({
    resolver: yupResolver(schema),
  });

  const { userClientForm, setUserClientForm } = useClientForm();
  const { activeStep, setActiveStep } = useActiveStep();
  const watchCep = watch("cep");
  const { userList, setUserList } = useUserList();

  console.log("userList", userList);

  useEffect(() => {
    GetAdressFromCep();
  }, [watchCep]);

  const onSubmit: SubmitHandler<ClientFormType> = (data) => {
    handleSetUserClientForm(data);

    handleSetUserList(data);

    handleNext();
  };

  const handleSetUserClientForm = async (data: ClientFormType) => {
    setUserClientForm({ ...userClientForm, ...data });
  };

  const handleSetUserList = (data: ClientFormType) => {
    const novoUsuario = { ...userClientForm, ...data };
    setUserList([...userList, novoUsuario]);
    setUserClientForm(contextDefaultValues.userClientForm);
  };

  const GetAdressFromCep = async () => {
    if (watchCep?.length !== 9) return;

    try {
      const response: CepResponse = await cep(watchCep);

      setValue("neighborhood", response.neighborhood);
      setValue("street", response.street);
      setValue("city", response.city);
      setValue("state", response.state);

      clearErrors("cep");
    } catch {
      setError("cep", { type: "manual", message: "CEP não encontrado" });
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid-cols-1 grid gap-3 md:grid-cols-2 w-full">
        <InputMasked
          name="cep"
          control={control}
          defaultValue={getValues("cep")}
          placeholder="Cep"
          errors={errors?.cep}
          mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
        />

        <Input
          register={register}
          name="street"
          placeholder="Endereço"
          errors={errors?.street}
        />

        <Input
          register={register}
          name="city"
          placeholder="Cidade"
          errors={errors?.city}
        />

        <Input
          register={register}
          errors={errors?.neighborhood}
          placeholder="Bairro"
          name="neighborhood"
        />

        <InputMasked
          placeholder="Cnpj"
          defaultValue={getValues("cnpj")}
          name="cnpj"
          errors={errors?.cnpj}
          control={control}
          mask={[
            /\d/,
            /\d/,
            /\d/,
            ".",
            /\d/,
            /\d/,
            /\d/,
            ".",
            /\d/,
            /\d/,
            /\d/,
            "/",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
          ]}
        />
        <Input
          register={register}
          errors={errors?.company}
          placeholder="Nome Fantasia"
          name="company"
        />

        <Input
          register={register}
          errors={errors?.tradingName}
          placeholder="Razão Social"
          name="tradingName"
        />
        <Input
          register={register}
          errors={errors?.complement}
          placeholder="Complemento"
          name="complement"
        />

        <Input
          register={register}
          errors={errors?.number}
          placeholder="Número"
          name="number"
        />
      </div>

      <div className="w-30 md:w-96 m-2">
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth={true}
        >
          {activeStep === stepsLength - 1 ? "Finalizar" : "Próximo"}
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;
