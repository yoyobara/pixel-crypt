import { Box, Button, TextField, Typography } from "@mui/material"
import React from "react"

interface PasswordStepProps {
	selectedPassword: string | null
	setSelectedPassword: React.Dispatch<React.SetStateAction<string>>
    passwordError: boolean
	gotoPrevious: () => void
	go: () => void
}

export default function PasswordStep({selectedPassword, setSelectedPassword, passwordError, gotoPrevious, go}: PasswordStepProps) {
    return (
        <>
            <Typography variant="h1">Choose your password</Typography>
            <TextField 
                type="password" 
                value={selectedPassword} 
                onChange={(event) => setSelectedPassword(event.target.value)}
                error={passwordError}
                helperText={passwordError ? "There was a problem decrypting your cipher" : ""}
            />
            <Box display="flex" justifyContent="space-between" alignSelf="stretch">
                <Button variant="text" onClick={gotoPrevious}>Back</Button>
                <Button disabled={selectedPassword === ""} variant="text" onClick={go}>Go!</Button>
            </Box>
        </>
    )
}