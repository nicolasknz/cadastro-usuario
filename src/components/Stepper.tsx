import React, { useEffect } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Input,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  TextField,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { ReactNode } from "react";
import { useActiveStep } from "../context/ActiveStepProvider";

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
    step: {
      background: "blue",
    },
  })
);

interface StepsProps {
  steps: StepProp[];
}

interface StepProp {
  title: string;
  content: ReactNode;
}

const theme = createMuiTheme({
  overrides: {
    MuiStepIcon: {
      root: {
        "&$completed": {
          color: "#f50057",
        },
        "&$active": {
          color: "#f50057",
        },
      },
      active: {},
      completed: {},
    },
  },
});

export default function VerticalLinearStepper({ steps }: StepsProps) {
  const classes = useStyles();
  const { activeStep, setActiveStep } = useActiveStep();

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    if (activeStep === steps.length) handleReset();
  }, [activeStep]);

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          color="secondary"
        >
          {steps.map(({ title, content }, index) => (
            <Step key={index} color="secondary">
              <StepLabel>{title}</StepLabel>
              <StepContent>
                {content}
                <div className={classes.actionsContainer}>
                  {activeStep !== 0 && (
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="outlined"
                        color="secondary"
                      >
                        Voltar
                      </Button>
                    </div>
                  )}
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </ThemeProvider>
    </div>
  );
}
