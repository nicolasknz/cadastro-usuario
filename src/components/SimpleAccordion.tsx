import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { UserClientForm } from "../types";

interface SimpleAccordionProps {
  user: UserClientForm;
}

export default function SimpleAccordion({ user }: SimpleAccordionProps) {
  return (
    <div className="w-full">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{user?.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4 center">
            <Typography>Cep: {user?.cep}</Typography>
            <Typography>Telefone: {user?.phone}</Typography>
            <Typography>Cnpj: {user?.cnpj}</Typography>
            <Typography>Email: {user?.email}</Typography>
            <Typography>Rua: {user?.street}</Typography>
            <Typography>Cidade: {user?.city}</Typography>
            <Typography>Complemento: {user?.complement}</Typography>
            <Typography>Estado: {user?.state}</Typography>
            <Typography>Número: {user?.number}</Typography>
            <Typography>Bairro: {user?.neighborhood}</Typography>
            <Typography>Nome Fantasia: {user?.company}</Typography>
            <Typography>Razão Social: {user?.tradingName}</Typography>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
