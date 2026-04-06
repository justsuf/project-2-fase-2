// Alyssa

// Game Staat
let currentStep = 0;

const steps = [
  { item: "spade", zone: "pit" },        
  { item: "stones", zone: "fire" },      
  { item: "stones", zone: "pit" },        
  { item: "bucket", zone: "pit" }         
];

let draggedItem = "";

document.querySelectorAll(".item").forEach(item => {
  item.addEventListener("dragstart", function(e) {
    draggedItem = this.id;
    this.style.opacity = "0.5";
    e.dataTransfer.effectAllowed = "move";
  });
  
  item.addEventListener("dragend", function() {
    this.style.opacity = "1";
  });
});

document.querySelectorAll(".zone").forEach(zone => {

  zone.addEventListener("dragover", function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    this.classList.add("hover");
  });

  zone.addEventListener("dragleave", function() {
    this.classList.remove("hover");
  });

  zone.addEventListener("drop", function(e) {
    e.preventDefault();
    this.classList.remove("hover");

    let rightStep = steps[currentStep];
    const statusEl = document.getElementById("status");
    const draggedElement = document.getElementById(draggedItem);

    if (draggedItem === rightStep.item && this.id === rightStep.zone) {
      currentStep++;
      statusEl.innerText = "Goed gedaan!";
      statusEl.className = "text-success fw-bold mt-3 fs-5";
      
      if (draggedItem === "spade") {
          document.getElementById("pit-img").src = "../../assets/images/kuil.png";
          draggedElement.style.display = "none"; 
      }
      
      if (draggedItem === "stones" && currentStep === 2) {
          document.getElementById("stones").querySelector("img").src = "../../assets/images/hete_steen.png";          
          statusEl.innerText = "De stenen worden heet! Verplaats ze nu naar de kuil.";
      }
      
      if (draggedItem === "stones" && currentStep === 3) {
          draggedElement.style.display = "none";          
          statusEl.innerText = "De hete stenen liggen in de kuil. Tijd voor water!";
      }
      
      if (currentStep === steps.length) {
        statusEl.innerText = "🎉 Gefeliciteerd! De stoomkuil is voltooid!";
        document.getElementById("steam-effect").classList.remove("d-none");
        draggedElement.style.display = "none";
      }

    } else {
      statusEl.innerText = "❌ Fout! Dat is niet de volgende logische stap.";
      statusEl.className = "text-danger fw-bold mt-3 fs-5";
    }
  });
});

const questions = [
    {
        question: "Hoe werden de hete stenen verplaatst?",
        options: ["Met de handen", "Met een leren doek", "Met ovenwarmers"],
        correct: 1
    },
    {
        question: "Wat gebeurt er als er water over de hete stenen word gegooid?",
        options: ["Er onstaan stoomwolken", "Er gebeurt niks", "Er onstaat een giftige gas"],
        correct: 0
    },
    {
        question: "Hoeveel stoomkuilen zijn er zichtbaar op de schoolplaat?",
        options: ["4", "1", "10"],
        correct: 0
    },
    {
        question: "Wat werd er nog meer gevonden in de stoomkuilen?",
        options: ["Aleen stenen", "Sieraden", "Aardewerk"],
        correct: 2
    },
    {
        question: "Waarom maakte mensen stoomkuilen?",
        options: ["Voor de leuk", "Als ritueel", "Voor warmte"],
        correct: 1
    }
];