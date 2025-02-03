import { Box, Button, Typography } from "@mui/material";
import React from "react";

interface UploadStepProps {
    mode: "encrypt" | "decrypt"
    selectedFile: File | null,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
    gotoNext: () => void
}

export default function UploadStep({mode, selectedFile, setSelectedFile, gotoNext}: UploadStepProps) {

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null) {
            setSelectedFile(null);
        }
        else {
            setSelectedFile(event.target.files.item(0))
        }
    }

    return (
        <>
            <Typography variant="h1">Upload your {mode === "encrypt" ? "file to encrypt" : "PNG cipher to decrypt"}!</Typography>
            <Box sx={{display: "flex", columnGap: "10px"}}>
                <Button component="label" variant="contained">
                    Choose File
                    <input type="file" hidden onChange={handleFileUpload}/>
                </Button>
                <Typography variant="h6" display="inline" color="info">{selectedFile?.name}</Typography>
            </Box>
            <Button disabled={selectedFile === null} variant="text" onClick={gotoNext} sx={{alignSelf: "end"}}>Next</Button>
        </>
    )
}