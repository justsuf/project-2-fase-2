// Alyssa

// Game
let currentStep = 0;

const steps = [
  { item: "schep", zone: "kuil" },
  { item: "stenen", zone: "vuur" },
  { item: "doek", zone: "kuil" },
  { item: "emmer", zone: "kuil" }
];

let draggedItem = "";

// START DRAG
document.querySelectorAll(".item").forEach(item => {
  item.addEventListener("dragstart", function() {
    draggedItem = this.id;
  });
});

// DROP ZONES
document.querySelectorAll(".zone").forEach(zone => {

  zone.addEventListener("dragover", function(e) {
    e.preventDefault();
  });

  zone.addEventListener("drop", function() {

    let rightStep = steps[currentStep];

    if (
      draggedItem === rightStep.item &&
      this.id === rightStep.zone
    ) {
      currentStep++;
      document.getElementById("status").innerText = "Goed!";

      if (currentStep === steps.length) {
        document.getElementById("status").innerText =
          "🎉 Je hebt de stoomkuil gemaakt!";
      }

    } else {
      document.getElementById("status").innerText =
        "❌ Fout! Opnieuw beginnen.";
      currentStep = 0;
    }

  });
});

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