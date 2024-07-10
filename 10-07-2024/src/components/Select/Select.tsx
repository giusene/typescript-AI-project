import { FormStateI } from "../Form/Form";
import style from "./Select.module.scss";

interface SelectProps {
    label: string;
    list: string[];
    action: (par1: keyof FormStateI, par2: string) => void
}

const Select = (props: SelectProps) => {
    const {label, list, action} = props



    return (
    <div className={style.inputCard}>
        <p>{label}:</p>
        <select defaultValue={list[0]} onChange={(e) => action("genere", e.target.value)}>
            {
                list.map((item, index) => <option key={index} value={item}>{item}</option>)
            }
        </select>
    </div>
    )
}

export default Select;

