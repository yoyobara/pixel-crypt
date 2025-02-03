import { Typography } from "@mui/material"

interface DownloadStepProps {
    mode: "encrypt" | "decrypt"
}

export function DownloadStep({mode}: DownloadStepProps) {
    const whatIsReady = mode === "encrypt" ? "cipher" : "file";
    const oppositeMode = mode === "encrypt" ? "decrypt" : "encrypt";

    return (
        <>
            <Typography variant="h1">Your {whatIsReady} is ready!</Typography>
            <Typography variant="h2">if you wanna {oppositeMode} it, use the "{oppositeMode}" tab!</Typography>
        </>
    )
}