// alle divs van activiteiten in de goede volgorde
const activities = ['activity-1','activity-2','activity-3','activity-4'];

// Huidige activiteit bijhouden (standaard/begin index 0)
let current = 0;

// Selectors voor navigatiebuttons
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

function showActivity(index) {
    // Activiteiten verbergen
    activities.forEach(function(id) {
        document.getElementById(id).classList.add('d-none');
    });

    // Correcte activiteit weergeven
    document.getElementById(activities[index]).classList.remove('d-none');

    // Linker navigatieknop verbergen op het eerste scherm
    if (index ===0) {
        btnPrev.classList.add('d-none');
    } else {
        btnPrev.classList.remove('d-none');
    }

    // quiz initialiseren wanneer activiteit 4 wordt weergeven
    if (index === 3) {
        initQuiz();
    }
}

// Eventlisteners en logica voor buttons
btnNext.addEventListener('click', function() {
    if (current < activities.length - 1) {
        current++;
        showActivity(current);
    }
});

btnPrev.addEventListener('click', function(){
    if (current > 0) {
        current --;
        showActivity(current);
    }
});

// Initiële pagina laden
showActivity(0);
