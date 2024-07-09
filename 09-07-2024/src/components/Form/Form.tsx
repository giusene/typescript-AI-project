'use client'

import { useState } from "react";
import style from "./Form.module.scss"
import Input from "../Input/Input";
import { AiFillPlayCircle } from "react-icons/ai";

export interface FormStateI {
    protagonista: string;
    antagonista: string;
    genere: string
}

const initialFormState: FormStateI = {
    protagonista: "",
    antagonista: "",
    genere: ""
}

const Form = () => {
    const [formState, setFormState] = useState<FormStateI>(initialFormState);
    const [prompt, setPrompt] = useState("")

    const [isReading, setIsReading] = useState<boolean>(false);
    const [showResume, setShowResume] = useState(false)

    const handleChange = (key: keyof FormStateI, value: string) => {
        setFormState(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const ripulisciCompletamenteTutto = () => {
        setFormState(initialFormState)
        setPrompt("")
    }

    const promptGenerator = () => {
        setPrompt(`creami una storia con protagonista ${formState.protagonista} e antagonista ${formState.antagonista} in stile ${formState.genere}`)
    }

    const leggi = () => {
        setIsReading(true)
        const utterance = new SpeechSynthesisUtterance(prompt);
        utterance.lang = "it-IT";
        speechSynthesis.speak(utterance)

        utterance.onend = () => {
            setIsReading(false)
        }
    }

    const stop = () => {
        setIsReading(false)
        speechSynthesis.cancel()
    }

    const pause = () => {
        setShowResume(true)
        speechSynthesis.pause()
    }

    const resume = () => {
        setShowResume(false)
        speechSynthesis.resume()
    }


    return (
        <div className={style.form}>
            <div className={style.container}>
                <Input label="Inserisci Protagonista" value={formState.protagonista} action={handleChange} stateKey="protagonista" />
                <Input label="Inserisci Antagonista" value={formState.antagonista} action={handleChange} stateKey="antagonista" />
                <Input label="Inserisci Genere" value={formState.genere} action={handleChange} stateKey="genere" />
            </div>
            <div className={style.buttons}>
                <button onClick={promptGenerator}>Crea</button>
                <button onClick={ripulisciCompletamenteTutto}>Pulisci</button>

                {
                    isReading ? 
                    <>
                        <button onClick={stop}>stop</button>
                        <button onClick={pause}>pause</button>
                    </>
                     : <AiFillPlayCircle onClick={leggi} />
                }

                {
                    showResume && <button onClick={resume}>resume</button>
                }
                
            </div>

            <div className={style.prompt}>
                {prompt}
            </div>
        </div>
    )
}

export default Form