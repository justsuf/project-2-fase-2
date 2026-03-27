document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById('plaat-container');
  const wrapper = document.getElementById('plaat-wrapper');
  const vergrootglazen = document.querySelectorAll('.vergrootglas');

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

    const rect = container.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    offsetX -= (mx / prevScale - mx / scale);
    offsetY -= (my / prevScale - my / scale);

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

      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );

      scale = startScale * (dist / startDist);
      scale = Math.max(minScale, Math.min(maxScale, scale));

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

});