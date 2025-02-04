import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import React from "react";

type ModeType = "encrypt" | "decrypt";

interface ModeSelectionProps {
	mode: ModeType
	setMode: React.Dispatch<React.SetStateAction<ModeType>>
}

export function ModeSelection({mode, setMode}: ModeSelectionProps) {

    const handleChange = (_event: React.MouseEvent<HTMLElement>, newMode: ModeType | null) => {
        if (newMode) {
            setMode(newMode);
        }
    }

    return (
        <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton value="encrypt">
				Encrypt
            </ToggleButton>
            <ToggleButton value="decrypt">
				Decrypt
            </ToggleButton>
        </ToggleButtonGroup>

    )
}