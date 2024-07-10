'use client'

import { useState } from "react";
import style from "./Form.module.scss"
import Input from "../Input/Input";
import { AiFillPlayCircle } from "react-icons/ai";
import { GenerateContentCandidate, GoogleGenerativeAI } from "@google/generative-ai";
import Select from "../Select/Select";
import { ImSpinner } from "react-icons/im";


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
    const [showResume, setShowResume] = useState(false);

    const [loading, setLoading] = useState(false);

    const useAI = true;


    const genresList = ["horror", "fantasy", "drammatico", "western", "distopico", "hifi", "commedia"]

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

    const promptGenerator = async () => {
        setLoading(true)
        if (process.env.NEXT_PUBLIC_GEMINI_API_KEY && useAI) {
            const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"})

            const result = await model.generateContent(`creami una storia con protagonista ${formState.protagonista} e antagonista ${formState.antagonista} in stile ${formState.genere}. aggiungi sempre il titolo`);

            const output = (result.response.candidates as GenerateContentCandidate[])[0].content.parts[0].text

            if (output) {
                setPrompt(output)
            }
            setLoading(false)
        } else {
            setLoading(false)
            setPrompt("Topolinia: La Caccia al Sorriso\n\nL'aria era stagnante e grigia, impregnata di un odore metallico e di fumo. La città di Topolinia, un tempo vibrante e colorata, era ora un groviglio di edifici grigi, controllata da un regime totalitario guidato dal cane da guardia, Pluto. La felicità era bandita, il sorriso un atto di ribellione.  \n\nPippo, un topo un tempo noto per la sua allegria e la sua spensieratezza, era diventato un fantasma, un fuggitivo. La sua risata, un tempo contagiosa, era diventata un sussurro soffocato, un'eco di un mondo perduto. Aveva visto Pluto, il suo vecchio amico, trasformarsi in un tiranno spietato. Un'ombra di ciò che era un tempo. \n\nPluto, con la sua voce metallica e i suoi occhi vuoti, aveva imposto la \"Legge del Silenzio\", un decreto che proibiva ogni forma di allegria e gioia. Le risate erano punite con la reclusione nei \"Centri di Riabilitazione\" - lugubri prigioni dove i sorrisi venivano cancellati con la forza.  \n\nPippo si aggirava per le strade deserte, cercando di mantenere la speranza viva. Raccontava storie di libertà e di gioia ai bambini che incontrava, sussurrando le canzoni che un tempo cantavano nelle piazze. La sua resistenza era silenziosa, ma potente. Era la scintilla che avrebbe potuto riaccendere la fiamma della speranza. \n\nUn giorno, Pippo si ritrovò a guardare una vecchia fotografia: lui e Pluto, sorridenti e spensierati, in un parco fiorito. Un'immagine che sembrava appartenere a un'altra vita. \n\n\"Pluto,\" sussurrò Pippo, \"cosa ti è successo?\"\n\nDeciso a salvare il suo amico e riportare la gioia a Topolinia, Pippo si mise in viaggio. Il suo obiettivo: infiltrarsi nel Palazzo di Pluto e spezzare la \"Legge del Silenzio\". \n\nIl percorso era pericoloso. Ogni angolo nascondeva una guardia di Pluto, ogni passo rischiava di essere il suo ultimo. Ma Pippo non si arrese. L'amore per il suo amico e la nostalgia per il mondo perduto erano il suo carburante. \n\nFinalmente, dopo giorni di viaggio e di pericoli superati, Pippo raggiunse il Palazzo.  Con astuzia e coraggio, riuscì ad entrare nella camera di Pluto. \n\nLo vide seduto al suo tavolo, la fronte corrugata, con una maschera di metallo che gli nascondeva il viso. \n\n\"Pluto, amico mio,\" disse Pippo, con voce tremante. \"Cosa ti ha fatto diventare così?\"\n\nPluto si girò lentamente, la maschera gli cadde, rivelando il suo viso segnato da una profonda tristezza. \n\n\"Non sono più il tuo amico, Pippo,\" rispose, con voce roca. \"Sono il protettore di Topolinia. La felicità è un'illusione pericolosa, un'arma che potrebbe distruggere il nostro mondo.\"\n\nPippo scoppiò a ridere, una risata profonda e liberatoria. \"No, Pluto, la felicità è la cosa più preziosa che abbiamo. Non lasciarti divorare dalla paura!\"\n\nLe parole di Pippo, come un raggio di sole in una giornata buia, raggiunsero il cuore di Pluto. In quel momento, un barlume di speranza, un bagliore di memoria, si accese nel suo sguardo. \n\n\"Pippo,\" disse Pluto, la sua voce piena di incredulità, \"tu… tu mi ricordi chi sono.\"\n\nPippo lo guardò con compassione, con la stessa tenerezza che provava un tempo. \"Sei ancora il mio amico, Pluto. E possiamo tornare a essere felici insieme.\"\n\nIn quel momento, la \"Legge del Silenzio\" si ruppe. Un sorriso, timido e incerto, apparve sul viso di Pluto. Poi, un'altra, e un'altra ancora. Fino a quando non si diffuse come un incendio in tutto il Palazzo, raggiungendo le strade di Topolinia.\n\nUn'ondata di risate si levò, liberando la città dal grigiore e dal silenzio. Un'onda di gioia che sconfisse il regime e restituì il sorriso a tutti. \n\nPippo e Pluto, fianco a fianco, camminavano per le strade di una Topolinia rinata. La loro amicizia, simbolo di speranza e di libertà, era un faro di luce in un mondo che aveva ritrovato la sua allegria.  \n")
        }
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
                <Select label="Seleziona genere" action={handleChange} list={genresList} />
                {/* <select defaultValue={genresList[0]} onChange={(e) => handleChange("genere", e.target.value)}>
                     {
                        genresList.map((item, index) => <option key={index} value={item}>{item}</option>)
                    }
                </select> */}

                {/* <Input label="Inserisci Genere" value={formState.genere} action={handleChange} stateKey="genere" /> */}

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
            
            {
                loading && <ImSpinner className={style.spinner} />
            }    
            <div className={style.prompt}>
                {prompt}
            </div>
        </div>
    )
}

export default Form