document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById('plaat-container');
  const wrapper = document.getElementById('plaat-wrapper');
  const vergrootglazen = document.querySelectorAll('.vergrootglas');
  const popup = document.getElementById('popup');
  const popupContent = document.getElementById('popup-content');
  const popupClose = document.getElementById('popup-close');

  let scale = 1;                
  const minScale = 1;          
  const maxScale = 4;           
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  function applyTransform() {
    container.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
    updateVergrootglazen();
  }

  function updateVergrootglazen() {
    vergrootglazen.forEach(v => {
      v.style.transform = `scale(${1 / scale})`;
      v.style.transformOrigin = 'center';
    });
  }

  function centerImage() {
    const wrapperWidth = wrapper.clientWidth;
    const wrapperHeight = wrapper.clientHeight;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    offsetX = (wrapperWidth - containerWidth) / 2;
    offsetY = (wrapperHeight - containerHeight) / 2;
    applyTransform();
  }

  // Zoom rond muispositie
  let lastWheelTime = 0;
  wrapper.addEventListener('wheel', (e) => {
    e.preventDefault();

    const now = performance.now();
    if (now - lastWheelTime < 16) return; 
    lastWheelTime = now;

    const zoomFactor = 0.03; // kleine stap voor vloeiende zoom
    const delta = e.deltaY < 0 ? 1 + zoomFactor : 1 - zoomFactor;
    const prevScale = scale;

    scale *= delta;
    scale = Math.min(Math.max(scale, minScale), maxScale);

    const rect = container.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    offsetX -= (mx / prevScale - mx / scale);
    offsetY -= (my / prevScale - my / scale);

    constrainOffsets();
    applyTransform();
  });

  // Pannen alleen als ingezoomd
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
    constrainOffsets();
    applyTransform();
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    wrapper.style.cursor = 'grab';
  });

  // Touch
  let initialDistance = 0;
  let initialScale = 1;

  wrapper.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      initialDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialScale = scale;
    } else if (e.touches.length === 1 && scale > 1) {
      isDragging = true;
      startX = e.touches[0].clientX - offsetX;
      startY = e.touches[0].clientY - offsetY;
    }
  });

  wrapper.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      scale = initialScale * (distance / initialDistance);
      scale = Math.min(Math.max(scale, minScale), maxScale);
      applyTransform();
    } else if (e.touches.length === 1 && isDragging) {
      offsetX = e.touches[0].clientX - startX;
      offsetY = e.touches[0].clientY - startY;
      constrainOffsets();
      applyTransform();
    }
  });

  wrapper.addEventListener('touchend', (e) => {
    if (e.touches.length === 0) isDragging = false;
  });

  function constrainOffsets() {
    const wrapperWidth = wrapper.clientWidth;
    const wrapperHeight = wrapper.clientHeight;

    const containerWidth = container.offsetWidth * scale;
    const containerHeight = container.offsetHeight * scale;

    const minX = Math.min(0, wrapperWidth - containerWidth);
    const minY = Math.min(0, wrapperHeight - containerHeight);
    const maxX = 0;
    const maxY = 0;

    offsetX = Math.min(maxX, Math.max(minX, offsetX));
    offsetY = Math.min(maxY, Math.max(minY, offsetY));
  }

  // Vergrootglazen
  vergrootglazen.forEach(v => {
    v.addEventListener('click', (e) => {
      e.stopPropagation();
      popupContent.innerText = v.dataset.info;
      popup.style.display = 'block';

      const rect = v.getBoundingClientRect();
      popup.style.left = rect.left + window.scrollX + 'px';
      popup.style.top = rect.top + window.scrollY + 'px';
    });
  });

  popupClose.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  // Init
  centerImage();

});