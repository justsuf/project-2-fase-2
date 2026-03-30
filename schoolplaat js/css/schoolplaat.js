document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('plaat-container');
  if (!container) return;

  const wrapper = document.getElementById('plaat-wrapper') || container;
  const vergrootglazen = document.querySelectorAll('.vergrootglas');
  const popup = document.getElementById('popup');
  const popupContent = document.getElementById('popup-content');
  const popupClose = document.getElementById('popup-close');

  let scale = 1;
  const minScale = 1;
  const maxScale = 5;
  let offsetX = 0;
  let offsetY = 0;
  let startX = 0;
  let startY = 0;
  let isDragging = false;
  let ticking = false;
  let startDistance = 0;
  let startScale = 1;

  function updateVergrootglazen() {
    vergrootglazen.forEach((glass) => {
      glass.style.transform = `scale(${1 / scale})`;
      glass.style.transformOrigin = 'center';
    });
  }

  function constrainOffsets() {
    const rect = container.getBoundingClientRect();
    const maxWidth = wrapper === container ? window.innerWidth : wrapper.clientWidth;
    const maxHeight = wrapper === container ? window.innerHeight : wrapper.clientHeight;

    const minX = Math.min(0, maxWidth - rect.width);
    const minY = Math.min(0, maxHeight - rect.height);

    offsetX = Math.max(minX, Math.min(0, offsetX));
    offsetY = Math.max(minY, Math.min(0, offsetY));
  }

  function updateTransform() {
    container.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${scale})`;
    updateVergrootglazen();
    ticking = false;
  }

  function requestUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateTransform);
      ticking = true;
    }
  }

  wrapper.addEventListener('wheel', (event) => {
    event.preventDefault();

    const zoomIntensity = 0.002;
    const delta = -event.deltaY * zoomIntensity;
    const previousScale = scale;

    scale += delta;
    scale = Math.max(minScale, Math.min(maxScale, scale));

    const rect = container.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    offsetX -= (mouseX / previousScale - mouseX / scale);
    offsetY -= (mouseY / previousScale - mouseY / scale);

    constrainOffsets();
    requestUpdate();
  }, { passive: false });

  wrapper.addEventListener('mousedown', (event) => {
    if (scale <= 1) return;

    isDragging = true;
    startX = event.clientX - offsetX;
    startY = event.clientY - offsetY;
    wrapper.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    offsetX = event.clientX - startX;
    offsetY = event.clientY - startY;

    constrainOffsets();
    requestUpdate();
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    wrapper.style.cursor = 'grab';
  });

  wrapper.addEventListener('touchstart', (event) => {
    if (event.touches.length === 2) {
      startDistance = Math.hypot(
        event.touches[0].clientX - event.touches[1].clientX,
        event.touches[0].clientY - event.touches[1].clientY
      );
      startScale = scale;
    } else if (event.touches.length === 1 && scale > 1) {
      isDragging = true;
      startX = event.touches[0].clientX - offsetX;
      startY = event.touches[0].clientY - offsetY;
    }
  }, { passive: true });

  wrapper.addEventListener('touchmove', (event) => {
    if (event.touches.length === 2) {
      event.preventDefault();

      const distance = Math.hypot(
        event.touches[0].clientX - event.touches[1].clientX,
        event.touches[0].clientY - event.touches[1].clientY
      );

      scale = startScale * (distance / startDistance);
      scale = Math.max(minScale, Math.min(maxScale, scale));
      constrainOffsets();
      requestUpdate();
      return;
    }

    if (isDragging && event.touches.length === 1) {
      offsetX = event.touches[0].clientX - startX;
      offsetY = event.touches[0].clientY - startY;
      constrainOffsets();
      requestUpdate();
    }
  }, { passive: false });

  wrapper.addEventListener('touchend', () => {
    isDragging = false;
  });

  vergrootglazen.forEach((glass) => {
    glass.addEventListener('click', (event) => {
      if (!popup || !popupContent) return;

      event.stopPropagation();
      popupContent.innerText = glass.dataset.info || '';
      popup.classList.add('visible');

      const rect = glass.getBoundingClientRect();
      popup.style.left = `${rect.left + window.scrollX}px`;
      popup.style.top = `${rect.bottom + window.scrollY + 8}px`;
    });
  });

  if (popupClose && popup) {
    popupClose.addEventListener('click', (event) => {
      event.stopPropagation();
      popup.classList.remove('visible');
    });
  }

  document.addEventListener('click', (event) => {
    if (!popup) return;
    if (popup.classList.contains('visible') && !popup.contains(event.target)) {
      popup.classList.remove('visible');
    }
  });

  updateVergrootglazen();
  requestUpdate();
});