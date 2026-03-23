document.addEventListener("DOMContentLoaded", () => {

let scale = 1;
let originX = 0;
let originY = 0;
let startX = 0;
let startY = 0;
let isDragging = false;

const container = document.getElementById('plaat-container');
const vergrootglazen = document.querySelectorAll('.vergrootglas');
const popup = document.getElementById('popup');
const popupContent = document.getElementById('popup-content');

function applyTransform() {
  container.style.transform = `translate(${originX}px, ${originY}px) scale(${scale})`;
  updateVergrootglazen();
}

function updateVergrootglazen() {
  vergrootglazen.forEach(v => {
    v.style.transform = `scale(${1 / scale})`;
    v.style.transformOrigin = 'center';
  });
}

// Zoom
container.addEventListener('wheel', (e) => {
  e.preventDefault();

  const zoomFactor = 0.1;
  const delta = e.deltaY < 0 ? 1 + zoomFactor : 1 - zoomFactor;

  scale *= delta;
  scale = Math.min(Math.max(scale, 1), 5);

  applyTransform();
});

// Drag
container.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX - originX;
  startY = e.clientY - originY;
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  originX = e.clientX - startX;
  originY = e.clientY - startY;

  applyTransform();
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

// Touch
let initialDistance = 0;
let initialScale = 1;

container.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    initialDistance = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    initialScale = scale;
  } else if (e.touches.length === 1) {
    isDragging = true;
    startX = e.touches[0].clientX - originX;
    startY = e.touches[0].clientY - originY;
  }
});

container.addEventListener('touchmove', (e) => {
  e.preventDefault();

  if (e.touches.length === 2) {
    const distance = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );

    scale = initialScale * (distance / initialDistance);
    scale = Math.min(Math.max(scale, 1), 5);
  } else if (e.touches.length === 1 && isDragging) {
    originX = e.touches[0].clientX - startX;
    originY = e.touches[0].clientY - startY;
  }

  applyTransform();
});

container.addEventListener('touchend', (e) => {
  if (e.touches.length === 0) isDragging = false;
});


vergrootglazen.forEach(v => {
  v.addEventListener('click', (e) => {
    e.stopPropagation(); 

    popupContent.innerText = v.dataset.info;
    popup.classList.add('visible');

    const rect = v.getBoundingClientRect();
    popup.style.left = rect.left + window.scrollX + 'px';
    popup.style.top = rect.top + window.scrollY + 'px';
  });
});

document.addEventListener('click', (e) => {
  if (isPopupOpen() && !popup.contains(e.target)) {
    popup.classList.remove('visible');
  }
});

function isPopupOpen() {
  return popup.classList.contains('visible');
}

// Init
updateVergrootglazen();

});