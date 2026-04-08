let juisteVolgorde = ["vuur", "offer", "stenen"];
let huidigeStap = 0;

// Start spel
function startSpel() {
    document.getElementById("schoolplaat").style.display = "none";
    document.getElementById("spel").style.display = "block";
}

// Drag & Drop functies
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let feedback = document.getElementById("feedback");

    // Check of item correct is voor deze stap
    if (data === juisteVolgorde[huidigeStap]) {
        huidigeStap++;
        feedback.innerText = "Goed gedaan!";
        feedback.style.color = "green";

        // Verplaats item naar dropzone
        ev.target.appendChild(document.getElementById(data));
    } else {
        feedback.innerText = "Verkeerde volgorde!";
        feedback.style.color = "red";

        // Item terugzetten naar items container
        document.getElementById("items").appendChild(document.getElementById(data));
        return; // stop functie zodat verkeerde stap niet verhoogt
    }

    // Check of ritueel compleet is
    if (huidigeStap === juisteVolgorde.length) {
        feedback.innerText = "Ritueel compleet!";
        feedback.style.color = "green";
    }
}
// ====================
// Quizvragen Grafheuvelritueel
// ====================
const questions = [
    { question: "Wat was het doel van een ritueel bij een grafheuvel?", options: ["Het weer voorspellen", "De overledene eren", "Een dorp bouwen"], correct: 1 },
    { question: "Welke elementen werden vaak gebruikt in een grafheuvelritueel?", options: ["Vuur, stenen en kralen", "Papieren en pennen", "Metaal en glas"], correct: 0 },
    { question: "Wat symboliseerde het vuur tijdens het ritueel?", options: ["Een plek om voedsel te koken", "Warmte voor de dorpelingen", "Bescherming en zuivering"], correct: 2 },
    { question: "Waarom werden offerandes gebracht naar de grafheuvel?", options: ["Om de geesten van de overledenen te eren", "Om een beloning te krijgen van de koning", "Voor het vermaak van het dorp"], correct: 0 },
    { question: "Wat gebeurde er als iemand het ritueel verkeerd uitvoerde?", options: ["De grafheuvel werd afgebroken","Het ritueel werd opnieuw uitgevoerd", "Er gebeurde niets"], correct: 1 },
];

// ====================
// Shuffle functie
// ====================
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ====================
// Quiz logica
// ====================

function startQuiz() {
    // Reset quizvariabelen
    currentQuestion = 0;
    score = 0;
    shuffledQuestions = shuffle([...questions]);

    // Zorg dat juiste secties zichtbaar zijn
    document.getElementById("activity-4").classList.remove("d-none");
    document.getElementById("quiz-question").classList.remove("d-none");
    document.getElementById("quiz-results").classList.add("d-none");
    document.getElementById("quiz-choice").classList.add("d-none");

    // Maak answer-buttons schoon
    document.getElementById("answer-options").innerHTML = "";

    // Start de eerste vraag
    showQuestion();
}

function showQuestion() {
    const q = shuffledQuestions[currentQuestion];
    document.getElementById("question-counter").innerText = `Vraag ${currentQuestion + 1} van ${shuffledQuestions.length}`;
    document.getElementById("question-text").innerText = q.question;

    const answerDiv = document.getElementById("answer-options");
    answerDiv.innerHTML = "";

    // Shuffle opties
    const shuffledOptions = shuffle([...q.options]);

    shuffledOptions.forEach(opt => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.classList.add("btn", "btn-outline-primary");
        btn.onclick = () => checkAnswer(opt, q.options[q.correct]);
        answerDiv.appendChild(btn);
    });
}

function checkAnswer(selected, correctAnswer) {
    if (selected === correctAnswer) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < shuffledQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById("quiz-question").classList.add("d-none");
    document.getElementById("quiz-results").classList.remove("d-none");
    document.getElementById("results-text").innerText = `Je hebt ${score} van de ${shuffledQuestions.length} vragen goed beantwoord!`;
}

document.getElementById("btn-replay").addEventListener("click", () => {
    resetSpel();
});
// Bij pagina load
let itemsContainer = document.getElementById("items");
let origineleItems = Array.from(itemsContainer.children); // originele volgorde

function resetSpel() {
    // Verberg quiz en resultaten
    document.getElementById("activity-4").classList.add("d-none");
    document.getElementById("quiz-question").classList.add("d-none");
    document.getElementById("quiz-results").classList.add("d-none");
    document.getElementById("quiz-choice").classList.add("d-none");

    // Reset drag & drop spel
    document.getElementById("spel").style.display = "none";
    document.getElementById("schoolplaat").style.display = "block";
    document.getElementById("feedback").innerText = "";

    // Reset volgorde van items in originele container
    huidigeStap = 0;
    origineleItems.forEach(item => {
        itemsContainer.appendChild(item); // terug naar originele plek
    });
}