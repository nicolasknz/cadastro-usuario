import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useActiveStep } from "../context/ActiveStepProvider";
import { useClientForm } from "../context/UserClientFormProvider";
import { UserForm as UserFormType } from "../types/index";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMasked from "./InputMasked";
import Input from "./Input";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  })
);

interface UserFormProps {
  stepsLength: number;
}

const schema = yup.object().shape({
  name: yup.string().min(3, "Nome muito curto").required("Campo obrigatório"),
  phone: yup
    .string()
    .min(11, "Telefone inválido")
    .required("Campo obrigatório"),
  email: yup.string().email("Formato inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(7, "Senha muito pequena"),
  lastName: yup.string().required("Campo obrigatório"),
});

const UserForm = ({ stepsLength }: UserFormProps) => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: yupResolver(schema),
  });

  const { userClientForm, setUserClientForm } = useClientForm();
  const { activeStep, setActiveStep } = useActiveStep();

  const onSubmit: SubmitHandler<UserFormType> = (data) => {
    console.log("UserFormSubmit", data);
    setUserClientForm({ ...userClientForm, ...data });

    handleNext();

    console.log(userClientForm);
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
        <Input
          register={register}
          placeholder="Nome"
          name="name"
          errors={errors?.name}
        />

        <Input
          register={register}
          placeholder="Sobrenome"
          name="lastName"
          errors={errors?.lastName}
        />

        <InputMasked
          control={control}
          placeholder="Telefone"
          mask={[
            "(",
            /\d/,
            /\d/,
            ")",
            " ",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]}
          defaultValue={getValues("phone")}
          errors={errors?.phone}
          name="phone"
        />

        <Input
          register={register}
          name="email"
          placeholder="E-mail"
          errors={errors?.email}
        />

        <Input
          register={register}
          name="password"
          placeholder="Senha"
          isPassword={true}
          errors={errors?.password}
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        {activeStep === stepsLength - 1 ? "Finalizar" : "Próximo"}
      </Button>
    </form>
  );
};

export default UserForm;
