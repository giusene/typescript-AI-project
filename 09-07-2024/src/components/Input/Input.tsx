import style from "./Input.module.scss"

import { FormStateI } from "../Form/Form";

interface InputPropsI {
    label: string;
    value: string;
    stateKey: keyof FormStateI;
    action: (par1: keyof FormStateI, par2: string) => void;
}

const Input = (props: InputPropsI) => {
    const {label, value, action, stateKey } = props;

    return (
        <div className={style.inputCard}>
            <p>{label}:</p>
            <input value={value} onChange={(e) => action(stateKey, e.target.value)} type="text"  />
        </div>
    )
}

export default Input