// Mike
// Quizvragen activiteit 4
const questions = [
    {
        question: "Vraag 1 voor verhaal 1?",
        options: ["Antwoord A", "Antwoord B", "Antwoord C"],
        correct: 0
    },
    {
        question: "Vraag 2 voor verhaal 1?",
        options: ["Antwoord A", "Antwoord B", "Antwoord C"],
        correct: 1
    },
    {
        question: "Vraag 3 voor verhaal 1?",
        options: ["Antwoord A", "Antwoord B", "Antwoord C"],
        correct: 2
    },
    {
        question: "Vraag 4 voor verhaal 1?",
        options: ["Antwoord A", "Antwoord B", "Antwoord C"],
        correct: 0
    },
    {
        question: "Vraag 5 voor verhaal 1?",
        options: ["Antwoord A", "Antwoord B", "Antwoord C"],
        correct: 1
    }
];

let juisteVolgorde = ["vuur", "offer", "stenen"];
let huidigeStap = 0;

// Start scherm tonen
document.getElementById("schoolplaat").style.display = "block";

function startSpel() {
    document.getElementById("schoolplaat").style.display = "none";
    document.getElementById("spel").style.display = "block";
}

function checkStap(stap) {
    if (stap === juisteVolgorde[huidigeStap]) {
        huidigeStap++;
        document.getElementById("feedback").innerText = "Goed!";
    } else {
        document.getElementById("feedback").innerText = "Verkeerd, probeer opnieuw.";
        huidigeStap = 0;
    }

    if (huidigeStap === juisteVolgorde.length) {
        document.getElementById("spel").style.display = "none";
        document.getElementById("vragen").style.display = "block";
    }
}

function antwoord(isGoed) {
    if (isGoed) {
        document.getElementById("resultaat").innerText = "Correct!";
    } else {
        document.getElementById("resultaat").innerText = "Niet juist.";
    }
}