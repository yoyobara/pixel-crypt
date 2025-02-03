import { Box, LinearProgress, Typography } from "@mui/material";

export default function ProcessingStep() {
    return (
        <>
            <Typography variant="h1">Processing your file...</Typography>
            <Box sx={{ width: '100%', marginY: "20px" }}>
                <LinearProgress variant="indeterminate"/>
            </Box>
        </>
    )
}