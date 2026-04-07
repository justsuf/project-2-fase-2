// Thomas
const questions = [
    {
        question: "Welk dier was een wild dier en soms gevaarlijk voor boeren?",
        options: ["Wolf", "Schaap", "Koe"],
        correct: 0
    },
    {
        question: "Waarom hielden boeren schapen?",
        options: ["Voor wol en vlees", "Voor transport", "Voor melk"],
        correct: 0
    },
    {
        question: "Welk dier gaf melk aan de boeren?",
        options: ["Wolf", "Schaap", "Koe"],
        correct: 2
    },
    {
        question: "Wat kon de wolf doen dat gevaarlijk was voor boeren?",
        options: ["Graan opeten", "Schapen aanvallen", "Water vervuilen"],
        correct: 1
    },
    {
        question: "Waarom waren dieren belangrijk voor de eerste boeren?",
        options: ["Voor plezier", "Om te overleven", "Voor sport"],
        correct: 1
    }
];

// DIEREN SPEL
let animals = [
    { name: "wolf", sound: "../../freesound_community-wolf-howl-6310.mp3", done: false },
    { name: "schaap", sound: "../../freesound_community-sheep-3-89230.mp3", done: false },
    { name: "koe", sound: "../../u_jd81cxyq22-cow-mooing-343423.mp3", done: false }
];

let currentAnimal = null;

// Speel random geluid
function playSound() {
    // Filter dieren die nog niet goed geraden zijn
    const remainingAnimals = animals.filter(a => !a.done);

    if (remainingAnimals.length === 0) {
        document.getElementById("game-result").innerHTML = "🎉 Je hebt alle dieren geraden!";
        document.getElementById("game-result").style.color = "blue";
        return;
    }

    const random = Math.floor(Math.random() * remainingAnimals.length);
    currentAnimal = remainingAnimals[random];

    console.log("Speelt:", currentAnimal.name); // debug

    const sound = new Audio(currentAnimal.sound);
    sound.currentTime = 0;
    sound.play().catch(err => {
        console.log("Geluid fout:", err);
    });
}

// Check antwoord
function guess(animal) {
    const result = document.getElementById("game-result");

    if (!currentAnimal) {
        result.innerHTML = "⚠️ Speel eerst een geluid!";
        result.style.color = "orange";
        return;
    }

    if (animal === currentAnimal.name) {
        result.innerHTML = `✅ Goed gedaan! Je hebt ${currentAnimal.name} geraden.`;
        result.style.color = "green";

        // Markeer dier als geraden
        animals = animals.map(a => a.name === currentAnimal.name ? { ...a, done: true } : a);

        // Reset currentAnimal zodat het geluid niet meer opnieuw kan
        currentAnimal = null;
    } else {
        result.innerHTML = "❌ Fout! Probeer opnieuw.";
        result.style.color = "red";
    }
}