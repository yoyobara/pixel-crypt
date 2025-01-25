import { Container, ThemeProvider } from "@mui/material"
import Navbar from "./components/Navbar"
import { useState } from "react"
import { darkTheme, lightTheme } from "./theme";

function App() {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Container>
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
            </Container>
        </ThemeProvider>
    )
}

export default App
