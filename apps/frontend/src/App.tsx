import { ThemeProvider, CssBaseline } from "@mui/material"
import Navbar from "./components/Navbar"
import { useState } from "react"
import { darkTheme, lightTheme } from "./theme";
import MainFrame from "./components/MainFrame/MainFrame";

function App() {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline/>
            <Navbar setDarkMode={setDarkMode}/>
            <MainFrame/>
        </ThemeProvider>
    )
}

export default App
