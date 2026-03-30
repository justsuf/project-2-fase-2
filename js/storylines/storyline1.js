// Thomas
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
//  DIEREN SPEL (toegevoegd)

const animals = [
    { name: "wolf", sound: "../../assets/sounds/wolf.mp3" },
    { name: "schaap", sound: "../../assets/sounds/sheep.mp3" },
    { name: "koe", sound: "../../assets/sounds/cow.mp3" }
];

let currentAnimal = null;

// Speel random geluid
function playSound() {
    const random = Math.floor(Math.random() * animals.length);
    currentAnimal = animals[random];

    const sound = new Audio(currentAnimal.sound);
    sound.play();
}

// Check antwoord
function guess(animal) {
    const result = document.getElementById("game-result");

    if (!currentAnimal) {
        result.innerHTML = " Speel eerst een geluid!";
        result.style.color = "orange";
        return;
    }

    if (animal === currentAnimal.name) {
        result.innerHTML = " Goed gedaan!";
        result.style.color = "green";
    } else {
        result.innerHTML = " Fout! Probeer opnieuw.";
        result.style.color = "red";
    }
}