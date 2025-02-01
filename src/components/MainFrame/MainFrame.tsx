import { Box, Container, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import EncryptionTab from "./Tabs/EncryptionTab";

export default function MainFrame() {
    const [currentTab, setCurrentTab] = useState<number>(0);

    const handleTabChange = (_event: React.SyntheticEvent, newTabValue: number) => {
        setCurrentTab(newTabValue);
    };

    return (
        <Container>
            <Box display="flex" justifyContent="space-between">
                <Typography fontWeight={100} fontSize={60}>Welcome to<br/>PixelCrypt!</Typography>
                <Box>
                    <Tabs value={currentTab} onChange={handleTabChange} >
                        <Tab label="Encrypt" sx={{fontSize: 50}}/>
                        <Tab label="Decrypt" sx={{fontSize: 50}}/>
                    </Tabs>
                </Box>
            </Box>
            <Paper sx={{display: "flex", flexDirection: "column", rowGap: "25px", marginY: "20px", padding: "10px 30px"}}>
                {currentTab === 0 ?  <EncryptionTab/> : <EncryptionTab/>}
            </Paper>
        </Container>
    )
}