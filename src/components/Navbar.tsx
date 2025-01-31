import { AppBar, Button, Toolbar, Typography, useTheme } from "@mui/material";
import DarkModeToggle from "react-dark-mode-toggle";

interface NavbarProps {
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

function Navbar({ setDarkMode }: NavbarProps) {
    return (
        <AppBar position="absolute">
            <Toolbar variant="regular" sx={{ columnGap: 2 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ flexGrow: 1 }}>
                    Pixel Crypt
                </Typography>
                <Button color="inherit">About</Button>
                <DarkModeToggle
                    checked={useTheme().palette.mode === "dark"}
                    onChange={setDarkMode}
                    size={60}
                    speed={3}
                />

            </Toolbar>
        </AppBar>
    );
}

export default Navbar;