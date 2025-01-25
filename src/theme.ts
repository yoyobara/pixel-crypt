import { createTheme } from "@mui/material";

const baseTheme = {
    typography: {
        fontFamily: "Rubik",
        h1: {
            fontSize: "2.5rem",
            fontWeight: 500,
        },
        h2: {
            fontSize: "2rem",
            fontWeight: 500,
        },
        body1: {
            fontSize: "1rem",
        },
    },
}

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#1976d2" }, // Blue
        secondary: { main: "#dc004e" }, // Red
        background: {
            default: "#f5f5f5",
            paper: "#ffffff",
        },
    },
    ...baseTheme
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#90caf9" }, // Light blue
        secondary: { main: "#f48fb1" }, // Pink
        background: {
            default: "#121212",
            paper: "#1d1d1d",
        },
    },
    ...baseTheme
});
