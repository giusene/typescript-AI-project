
let valore1 = "pippo";

let valore2 = 1234;

let valore3 = 4567;



const sum = (val1: number, val2: number): string => {
    const totale = val1 + val2;
    return `il totale della funzione è ${totale}`
}


sum(valore3, valore2);

type Nazionalita = "italiana" | "estera";


interface UserInterface {
    nome: string;
    cognome: string;
    eta: number | null;
    nazionalita: Nazionalita
}

const user: UserInterface = {
    cognome: "undefined",
    nome: "undefined",
    eta: 1234,
    nazionalita: "estera"
}


if (user.nazionalita === "italiana") {
    // fai qualcosa
}


const sum2 = (par1, par2) => {
    const totale = par1 + par2;
    return totale
}

sum2("10", "10");


let arrayDiString: string[]

let arratDiNumeri: number[];

let arrayUser: UserInterface[];


const newArray = arrayUser.map(item => item.eta)

const box = document.addEventListener("click", (e: Event) => {
    e.preventDefault()
    console.log(e)
})

