document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById('plaat-container');
  const wrapper = document.getElementById('plaat-wrapper');
  const vergrootglazen = document.querySelectorAll('.vergrootglas');

  const popup = document.getElementById('popup');
  const popupContent = document.getElementById('popup-content');
  const popupButton = document.getElementById('popup-button');
  const popupClose = document.getElementById('popup-close');

  let currentLink = "";


  let scale = 1;
  const minScale = 1;
  const maxScale = 4;

  let offsetX = 0;
  let offsetY = 0;

  let isDragging = false;
  let startX = 0;
  let startY = 0;

  let ticking = false;


  function update() {
    container.style.transform =
      `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${scale})`;

    // Vergrootglazen schalen tegen zoom
    vergrootglazen.forEach(v => {
      v.style.transform = `scale(${1 / scale})`;
    });

    ticking = false;
  }

  function requestUpdate() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }


  function constrain() {
    const rect = container.getBoundingClientRect();
    const w = wrapper.clientWidth;
    const h = wrapper.clientHeight;

    const minX = Math.min(0, w - rect.width);
    const minY = Math.min(0, h - rect.height);

    offsetX = Math.max(minX, Math.min(0, offsetX));
    offsetY = Math.max(minY, Math.min(0, offsetY));
  }


wrapper.addEventListener('wheel', (e) => {
  e.preventDefault();

  const zoomIntensity = 0.002;
  const delta = -e.deltaY * zoomIntensity;

  const prevScale = scale;
  scale += delta;
  scale = Math.max(minScale, Math.min(maxScale, scale));

  // Cursor positie relatief tot container inclusief offset
  const rect = container.getBoundingClientRect();
  const cursorX = e.clientX - rect.left;
  const cursorY = e.clientY - rect.top;

  // Pas offset aan zodat zoom rond cursor blijft
  offsetX -= (cursorX) * (scale - prevScale) / scale;
  offsetY -= (cursorY) * (scale - prevScale) / scale;

  constrain();
  requestUpdate();
}, { passive: false });


  wrapper.addEventListener('mousedown', (e) => {
    if (scale <= 1) return;

    isDragging = true;
    startX = e.clientX - offsetX;
    startY = e.clientY - offsetY;

    wrapper.style.cursor = 'grabbing';
  });


  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    offsetX = e.clientX - startX;
    offsetY = e.clientY - startY;

    constrain();
    requestUpdate();
  });


  document.addEventListener('mouseup', () => {
    isDragging = false;
    wrapper.style.cursor = 'grab';
  });


  let startDist = 0;
  let startScale = 1;

  wrapper.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      startDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      startScale = scale;
    } else if (e.touches.length === 1 && scale > 1) {
      isDragging = true;
      startX = e.touches[0].clientX - offsetX;
      startY = e.touches[0].clientY - offsetY;
    }
  });

  wrapper.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    e.preventDefault();

    const rect = container.getBoundingClientRect();
    const prevScale = scale;

    // Pinch afstand
    const dist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );

    // Bereken schaal
    scale = startScale * (dist / startDist);
    scale = Math.max(minScale, Math.min(maxScale, scale));

    // Vind pinch midpoint
    const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

    // Relatief tot container
    const cursorX = midX - rect.left;
    const cursorY = midY - rect.top;

    // Pas offset aan zodat pinch zoom rond midpoint blijft
    offsetX -= (cursorX) * (scale - prevScale) / scale;
    offsetY -= (cursorY) * (scale - prevScale) / scale;

    constrain();
    requestUpdate();

  } else if (isDragging && e.touches.length === 1) {
    offsetX = e.touches[0].clientX - startX;
    offsetY = e.touches[0].clientY - startY;

    constrain();
    requestUpdate();
  }
}, { passive: false });

  wrapper.addEventListener('touchend', () => {
    isDragging = false;
  });


  vergrootglazen.forEach((v) => {
    v.addEventListener('click', (e) => {
      e.stopPropagation();

      popupContent.textContent = v.dataset.info || '';
      currentLink = v.dataset.link || '';

      popup.classList.add('visible');

      const rect = v.getBoundingClientRect();
      const margin = 10;

      let left = rect.right + margin;
      let top = rect.top;

  
      const maxLeft = window.scrollX + window.innerWidth - popup.offsetWidth - margin;
      const minLeft = window.scrollX + margin;
      left = Math.max(minLeft, Math.min(maxLeft, left));

   
      const maxTop = window.scrollY + window.innerHeight - popup.offsetHeight - margin;
      const minTop = window.scrollY + margin;
      top = Math.max(minTop, Math.min(maxTop, top));

      popup.style.left = `${left}px`;
      popup.style.top = `${top}px`;
    });
  });


  popupButton.addEventListener('click', () => {
    if (currentLink) {
      window.location.href = currentLink;
    }
  });


  popupClose.addEventListener('click', () => {
    popup.classList.remove('visible');
  });


  document.addEventListener('click', (e) => {
    if (!popup.contains(e.target)) {
      popup.classList.remove('visible');
    }
  });

});