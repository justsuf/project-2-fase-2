// Bijhouden wat de actieve vraag en de score is
let currentQuestion = 0;
let score = 0;

// Selectors voor elementen die we moeten manipuleren
const questionCounter = document.getElementById('question-counter');
const questionText    = document.getElementById('question-text');
const answerOptions   = document.getElementById('answer-options');
const quizQuestion    = document.getElementById('quiz-question');
const quizResults     = document.getElementById('quiz-results');
const quizChoice      = document.getElementById('quiz-choice');
const resultsText     = document.getElementById('results-text');

// Logica voor het tonen van de correcte vraag en antwoorden
function showQuestion(index) {
    const q = questions[index];

    // De teller van de vraag bijwerken
    questionCounter.textContent = `Vraag ${index + 1} van ${questions.length}`;

    // Tekst updaten
    questionText.textContent = q.question;

    // Oude antwoorden weghalen en nieuwe set antwoorden neerzetten
    answerOptions.innerHTML = '';

    q.options.forEach(function(option, i) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-primary';
        btn.textContent = option;

        // Check welk antwoord wordt gegeven en geef door aan handleAnswer()
        btn.addEventListener('click', function() {
            handleAnswer(i);
        });

        answerOptions.appendChild(btn);
    });
}

// logica voor het verwerken van de antwoorden 
function handleAnswer(selectedIndex) {
    // Checken of het antwoord correct is en de score updaten
    if (selectedIndex === questions[currentQuestion].correct) {
        score++;
    }

    // Door naar de volgende vraag of eindresultaat weergeven
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
    } else {
        showResults();
    }
}

// Resultaten weergeven
function showResults() {
    quizQuestion.classList.add('d-none');
    quizResults.classList.remove('d-none');

    resultsText.textContent = 
        `Je had ${score} van de ${questions.length} vragen goed!`;
}

// Keuze terug naar map of verder verkennen
document.getElementById('btn-to-choice').addEventListener('click', function() {
    quizResults.classList.add('d-none');
    quizChoice.classList.remove('d-none');
});

// Quiz resetten indien de speler op blijf verkennen klikt
function resetQuiz() {
    currentQuestion = 0;
    score = 0;

    // Gamestate terug naar vragen
    quizResults.classList.add('d-none');
    quizChoice.classList.add('d-none');
    quizQuestion.classList.remove('d-none');

    showQuestion(0);
}

document.getElementById('btn-replay').addEventListener('click', function() {
    resetQuiz();

    // Terug naar de eerste activiteit via logica van story-nav.js
    current = 0;
    showActivity(0);
});

// Start de quiz, wordt aangeroepen wanneer activiteit 4 wordt weergeven
function initQuiz() {
    resetQuiz();
}