import { useState } from "react";
import MyStepper from "./MyStepper";
import UploadStep from "./UploadStep";
import PasswordStep from "./PasswordStep";

const STEP_TITLES = [
    "Select file",
    "Choose password",
    "File encryption",
    "Download PNG ciper"
]

export default function EncryptionTab() {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedPassword, setSelectedPassword] = useState<string>("");

    const gotoNext = () => setCurrentStep(currentStep + 1);
    const gotoPrevious = () => setCurrentStep(currentStep - 1);
    const go = () => {
        console.log("Bruh");
    }

    let stepContent;
    switch (currentStep) {
    case 0:
        stepContent = <UploadStep selectedFile={selectedFile} setSelectedFile={setSelectedFile} gotoNext={gotoNext}/>
        break;
    case 1:
        stepContent = <PasswordStep selectedPassword={selectedPassword} setSelectedPassword={setSelectedPassword} gotoPrevious={gotoPrevious} go={go}/>
        break;
    case 2:
        stepContent = <p>lvl3</p>
        break;
    case 3:
        stepContent = <p>lvl4</p>
        break;
    }

    return (
        <>
            <MyStepper currentStep={currentStep} stepTitles={STEP_TITLES}/>
            {stepContent}
        </>
    )
}