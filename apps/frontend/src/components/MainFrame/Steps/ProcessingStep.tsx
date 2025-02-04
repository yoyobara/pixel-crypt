import { Box, LinearProgress, Typography } from "@mui/material";

interface ProcessingStepProps {
    mode: "encrypt" | "decrypt"
    loading: boolean
}

export default function ProcessingStep({ mode, loading }: ProcessingStepProps) {
    const processingWhat = mode === "encrypt" ? "file" : "cipher";

    return (
        <>
            <Typography variant="h1">Processing your {processingWhat}...</Typography>
            <Box sx={{ width: '100%', marginY: "20px" }}>
                {
                    loading 
                        ?
                        <LinearProgress variant="indeterminate"/>
                        :
                        <LinearProgress variant="determinate" color="success" value={100}/>
                }
            </Box>
        </>
    )
}