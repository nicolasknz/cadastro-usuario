import { createContext, FC, useContext, useState } from "react";
import { ActiveStepState } from "../types";

const contextDefaultValues: ActiveStepState = {
  activeStep: 0,
  setActiveStep: () => {},
};

export const ActiveStepContext =
  createContext<ActiveStepState>(contextDefaultValues);

const ActiveStepProvider: FC = ({ children }) => {
  const [activeStep, setActiveStep] = useState<number>(
    contextDefaultValues.activeStep
  );
  return (
    <ActiveStepContext.Provider value={{ activeStep, setActiveStep }}>
      {children}
    </ActiveStepContext.Provider>
  );
};

export function useActiveStep() {
  const context = useContext(ActiveStepContext);
  const { activeStep, setActiveStep } = context;
  return { activeStep, setActiveStep };
}

export default ActiveStepProvider;
