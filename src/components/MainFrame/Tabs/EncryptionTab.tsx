import { useState } from "react";
import MyStepper from "./MyStepper";
import UploadStep from "./UploadStep";
import PasswordStep from "./PasswordStep";
import ProcessingStep from "./ProcessingStep";
import { encrypt } from "../../../cipher";
import { DownloadStep } from "./DownloadStep";

const STEP_TITLES = [
    "Select file",
    "Choose password",
    "File processing",
    "Download PNG ciper"
]

function downloadFile(file: Blob, filename: string) {
    const linkElement = document.createElement('a');

    linkElement.href = URL.createObjectURL(file);
    linkElement.download = filename;
    
    linkElement.click();
}

export default function EncryptionTab() {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedPassword, setSelectedPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const gotoNext = () => setCurrentStep(currentStep + 1);
    const gotoPrevious = () => setCurrentStep(currentStep - 1);
    const go = async () => {
        setCurrentStep(2);

        const pngCipher = await encrypt(selectedFile!, selectedPassword);
        setLoading(false);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setCurrentStep(3);
        downloadFile(pngCipher, "cipher.png");
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
        stepContent = <ProcessingStep loading={loading}/>
        break;
    case 3:
        stepContent = <DownloadStep/>
        break;
    }

    return (
        <>
            <MyStepper currentStep={currentStep} stepTitles={STEP_TITLES}/>
            {stepContent}
        </>
    )
}