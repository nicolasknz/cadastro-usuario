import { Button, IconButton } from "@material-ui/core";
import React from "react";
import ClientForm from "./ClientForm";
import Stepper from "./Stepper";
import UserForm from "./UserForm";
import CloseIcon from "@material-ui/icons/Close";

interface RegisterProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Register = ({ open, setOpen }: RegisterProps) => {
  const steps = [
    { title: "Dados usuário", content: <UserForm stepsLength={2} /> },
    { title: "Dados cliente", content: <ClientForm stepsLength={2} /> },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center m-10 w-full p-8">
      <Button
        type="button"
        onClick={handleOpen}
        variant="contained"
        color="secondary"
      >
        Novo usuário
      </Button>
      {open && (
        <div className="m-10 w-full relative">
          <div className="flex justify-end mt-3 absolute right-2 z-3 top-0">
            <IconButton
              color="secondary"
              className="justify-self-end"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Stepper steps={steps} />
        </div>
      )}
    </div>
  );
};

export default Register;
