import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import DarkModeToggle from "react-dark-mode-toggle";

interface NavbarProps {
    darkMode: boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

function Navbar({darkMode, setDarkMode}: NavbarProps) {
    
    return (
        <AppBar position="static">
            <Toolbar variant="regular" sx={{ columnGap: 2 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ flexGrow: 1 }}>
                    Pixel Crypt
                </Typography>
                <Button color="inherit">About</Button>
                <DarkModeToggle
                    checked={darkMode}
                    onChange={setDarkMode}
                    size={60}
                    speed={3}
                />

            </Toolbar>
        </AppBar>
    );
}

export default Navbar;