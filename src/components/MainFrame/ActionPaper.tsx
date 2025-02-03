import { useState } from "react";
import { encrypt } from "../../cipher";
import { DownloadStep } from "./Steps/DownloadStep";
import PasswordStep from "./Steps/PasswordStep";
import ProcessingStep from "./Steps/ProcessingStep";
import UploadStep from "./Steps/UploadStep";
import { Paper, Step, StepLabel, Stepper } from "@mui/material";

function downloadFile(file: Blob, filename: string) {
    const linkElement = document.createElement('a');

    linkElement.href = URL.createObjectURL(file);
    linkElement.download = filename;
    
    linkElement.click();
}

interface ActionPaperProps {
	mode: "encrypt" | "decrypt"
}

export function ActionPaper({mode}: ActionPaperProps) {
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
        stepContent = <UploadStep mode={mode} selectedFile={selectedFile} setSelectedFile={setSelectedFile} gotoNext={gotoNext}/>
        break;
    case 1:
        stepContent = <PasswordStep selectedPassword={selectedPassword} setSelectedPassword={setSelectedPassword} gotoPrevious={gotoPrevious} go={go}/>
        break;
    case 2:
        stepContent = <ProcessingStep mode={mode} loading={loading}/>
        break;
    case 3:
        stepContent = <DownloadStep mode={mode}/>
        break;
    }

    return (
        <Paper sx={{display: "flex", flexDirection: "column", rowGap: "25px", marginY: "20px", padding: "10px 30px", alignItems: "start"}}>
            <Stepper activeStep={currentStep} sx={{alignSelf: "stretch"}}>
                <Step><StepLabel>Upload</StepLabel></Step>
                <Step><StepLabel>Choose Password</StepLabel></Step>
                <Step><StepLabel>Processing</StepLabel></Step>
                <Step><StepLabel>Finish</StepLabel></Step>
            </Stepper>
            {stepContent}
        </Paper>
    )
	
}