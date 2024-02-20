import React from "react"

interface FieldProps {
    label: string;
    value : string;
    onChange?: (newValue: string) => void;
}

export default function Field(props: FieldProps) {
    return (
        <><label>{props.label}:</label> <input /></>
        
    )
}