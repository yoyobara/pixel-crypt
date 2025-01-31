import { useState } from "react";
import MyStepper from "./MyStepper";
import { Button } from "@mui/material";

const STEP_TITLES = [
    "Select a file To encrypt",
    "Choose Password",
    "File encryption",
    "Download PNG ciper"
]

export default function EncryptionTab() {
    const [currentStep, setCurrentStep] = useState<number>(0);

    switch (currentStep) {
    case 0:
        break;
    case 1:
        break;
    case 2:
        break;
    case 3:
        break;
    }

    return (
        <>
            <MyStepper currentStep={currentStep} stepTitles={STEP_TITLES}/>
        </>
    )
}