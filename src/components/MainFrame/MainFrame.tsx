import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import { ModeSelection } from "./ModeSelection";
import { ActionPaper } from "./ActionPaper";

export default function MainFrame() {
    const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" alignItems="flex-end">
                <Typography fontWeight={100} fontSize={60}>Welcome to<br/>PixelCrypt!</Typography>
                <ModeSelection mode={mode} setMode={setMode}/>
            </Box>
            <ActionPaper mode={mode}/>
        </Container>
    )
}