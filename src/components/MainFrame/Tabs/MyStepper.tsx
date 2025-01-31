import { Step, StepLabel, Stepper } from "@mui/material";

interface MyStepperProps {
    currentStep: number,
    stepTitles: string[]
}

export default function MyStepper({currentStep, stepTitles}: MyStepperProps) {
    return (
        <Stepper activeStep={currentStep}>
            {
                stepTitles.map((stepName) => <Step key={stepName}><StepLabel>{stepName}</StepLabel></Step>)
            }
        </Stepper>
    )
}