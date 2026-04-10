// Alex
// Quizvragen activiteit 4
const questions = [
    {
        question: "Uit welke regio's komen de kledingvoorbeelden vooral, omdat in Nederland weinig kleding goed bewaard is gebleven?",
        options: ["Noord-Duitsland en Denemarken", "Frankrijk en Belgie", "Spanje en Italie"],
        correct: 0
    },
    {
        question: "Welke kleding droeg een vrouw in de bronstijd doorgaans?",
        options: ["Een wollen mantel en een leren broek", "Een blouse en een lange rok", "Een korte tuniek en laarzen"],
        correct: 1
    },
    {
        question: "Waarom werden bij vrouwen in Denemarken vaak geen mantelspelden bij de schouders gevonden?",
        options: ["Omdat vrouwen toen geen sieraden droegen", "Omdat de kleding van bont was gemaakt", "Omdat zij een nauwsluitende blouse op maat droegen"],
        correct: 2
    },
    {
        question: "Waarmee werd de mantel van mannen bij elkaar gehouden?",
        options: ["Met een mantelspeld", "Met een touw van stro", "Met een houten gesp"],
        correct: 0
    },
    {
        question: "Waar hielden vrouwen in de bronstijd volgens de tekst van om zich mee te versieren?",
        options: ["Alleen oorbellen en kronen", "Hals-, arm- en vingerringen", "Beschilderde schoenen en riemen"],
        correct: 1
    }
];

const dressupState = {
    model: 'male',
    outfits: {
        male: {
            head: '',
            neck: '',
            top: '',
            jacket: '',
            arm: '',
            bottom: '',
            shoes: '',
            accessory: ''
        },
        female: {
            head: '',
            neck: '',
            top: '',
            jacket: '',
            arm: '',
            bottom: '',
            shoes: '',
            accessory: ''
        }
    }
};

const dressupAssetBasePath = '../../assets/images/storyline2/dressup';

const modelButtons = document.querySelectorAll('.model-btn');
const itemButtons = document.querySelectorAll('.dressup-item');
const resetButton = document.getElementById('dressup-reset');
const dressupCharacter = document.getElementById('dressup-character');
const layerBase = document.getElementById('layer-base');
const layerHead = document.getElementById('layer-head');
const layerNeck = document.getElementById('layer-neck');
const layerTop = document.getElementById('layer-top');
const layerBottom = document.getElementById('layer-bottom');
const layerShoes = document.getElementById('layer-shoes');
const layerArm = document.getElementById('layer-arm');
const layerAccessory = document.getElementById('layer-accessory');
const layerJacket = document.getElementById('layer-jacket');

function modelBaseImagePath(model) {
    return dressupAssetBasePath + '/models/' + model + '-base.png';
}

function itemImagePath(model, item) {
    return dressupAssetBasePath + '/items/' + model + '/' + item + '.png';
}

function setLayerImage(layerElement, imagePath) {
    if (!layerElement) {
        return;
    }

    if (!imagePath) {
        layerElement.style.backgroundImage = 'none';
        return;
    }

    layerElement.style.backgroundImage = 'url("' + imagePath + '")';
}

function getActiveOutfit() {
    return dressupState.outfits[dressupState.model];
}

function renderDressup() {
    if (!dressupCharacter) {
        return;
    }

    const activeOutfit = getActiveOutfit();

    dressupCharacter.classList.remove('male', 'female');
    dressupCharacter.classList.add(dressupState.model);

    setLayerImage(layerBase, modelBaseImagePath(dressupState.model));
    setLayerImage(layerHead, activeOutfit.head ? itemImagePath(dressupState.model, activeOutfit.head) : '');
    setLayerImage(layerNeck, activeOutfit.neck ? itemImagePath(dressupState.model, activeOutfit.neck) : '');
    setLayerImage(layerTop, activeOutfit.top ? itemImagePath(dressupState.model, activeOutfit.top) : '');
    setLayerImage(layerBottom, activeOutfit.bottom ? itemImagePath(dressupState.model, activeOutfit.bottom) : '');
    setLayerImage(layerShoes, activeOutfit.shoes ? itemImagePath(dressupState.model, activeOutfit.shoes) : '');
    setLayerImage(layerArm, activeOutfit.arm ? itemImagePath(dressupState.model, activeOutfit.arm) : '');
    setLayerImage(layerAccessory, activeOutfit.accessory ? itemImagePath(dressupState.model, activeOutfit.accessory) : '');
    setLayerImage(layerJacket, activeOutfit.jacket ? itemImagePath(dressupState.model, activeOutfit.jacket) : '');

    modelButtons.forEach(function(button) {
        const isActiveModel = button.dataset.model === dressupState.model;
        button.classList.toggle('is-active', isActiveModel);
    });

    itemButtons.forEach(function(button) {
        const slot = button.dataset.slot;
        const item = button.dataset.item;
        const itemModel = button.dataset.model;
        const isVisible = itemModel === dressupState.model;
        const isActiveItem = isVisible && activeOutfit[slot] === item;
        button.classList.toggle('d-none', !isVisible);
        button.classList.toggle('is-active', isActiveItem);
    });
}

function initDressupGame() {
    if (!dressupCharacter) {
        return;
    }

    modelButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            dressupState.model = button.dataset.model;
            renderDressup();
        });
    });

    itemButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const slot = button.dataset.slot;
            const item = button.dataset.item;
            const activeOutfit = getActiveOutfit();

            if (activeOutfit[slot] === item) {
                activeOutfit[slot] = '';
            } else {
                activeOutfit[slot] = item;

                // Lang gewaad is mutually exclusive with broek (same slot, handled automatically)
                // and also with shirt (different slot)
                if (item === 'lang-gewaad') {
                    activeOutfit.top = '';
                } else if (slot === 'top' && item === 'shirt') {
                    if (activeOutfit.bottom === 'lang-gewaad') {
                        activeOutfit.bottom = '';
                    }
                }
            }

            renderDressup();
        });
    });

    if (resetButton) {
        resetButton.addEventListener('click', function() {
            const activeOutfit = getActiveOutfit();
            activeOutfit.head = '';
            activeOutfit.neck = '';
            activeOutfit.top = '';
            activeOutfit.jacket = '';
            activeOutfit.arm = '';
            activeOutfit.bottom = '';
            activeOutfit.shoes = '';
            activeOutfit.accessory = '';
            renderDressup();
        });
    }

    renderDressup();
}

initDressupGame();