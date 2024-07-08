'use client'

import { useState } from "react"

interface FormStateI {
    protagonista: string;
    antagonista: string;
}

const Form = () => {
    const [formState, setFormState] = useState<FormStateI>({
        protagonista: "",
        antagonista: ""
    });

    const handleChange = (key: keyof FormStateI, value: string) => {

        setFormState(prev => ({
            ...prev,
            [key]: value
        }))
    }



    return (
        <div className="form">
            <input value={formState.protagonista} onChange={(e) => handleChange("protagonista", e.target.value)} type="text"  />
            <input value={formState.antagonista} onChange={(e) => handleChange("antagonista", e.target.value)} type="text" />
        </div>
    )
}

export default Form