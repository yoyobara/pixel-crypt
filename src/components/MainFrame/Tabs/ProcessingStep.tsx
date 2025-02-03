import { Box, LinearProgress, Typography } from "@mui/material";

interface ProcessingStepProps {
    loading: boolean
}

export default function ProcessingStep({ loading }: ProcessingStepProps) {
    return (
        <>
            <Typography variant="h1">Processing your file...</Typography>
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