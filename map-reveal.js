// Populate galleries and animate on scroll, matching site's look & feel

document.addEventListener('DOMContentLoaded', () => {
  // 30-hour countdown
  const COUNTDOWN_MS = 30 * 60 * 60 * 1000; // 30 hours
  
  // Get or set deadline in localStorage to persist across reloads
  let deadline = localStorage.getItem('mapRevealDeadline');
  if (!deadline) {
    deadline = Date.now() + COUNTDOWN_MS;
    localStorage.setItem('mapRevealDeadline', deadline);
  } else {
    deadline = parseInt(deadline);
  }
  
  const timeEl = document.getElementById('countdown-time');
  function pad(n){ return String(n).padStart(2,'0'); }
  function tick() {
    const remaining = Math.max(0, deadline - Date.now());
    const hrs = Math.floor(remaining / (1000 * 60 * 60));
    const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((remaining % (1000 * 60)) / 1000);
    if (timeEl) {
      const text = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
      timeEl.textContent = text;
      timeEl.setAttribute('data-time', text);
    }
    if (remaining <= 0) {
      clearInterval(timerId);
      localStorage.removeItem('mapRevealDeadline');
    }
  }
  const timerId = setInterval(tick, 1000);
  tick();

  const roboRashItems = [
    { image: 'maps/roborash1.jpg', text: 'Ramp Zone' },
    { image: 'maps/roborash2.jpg', text: 'Curve Section' },
    { image: 'maps/roborash3.jpg', text: 'Tunnel Area' },
    { image: 'maps/roborash4.jpg', text: 'Checkpoint' },
    { image: 'maps/roborash5.jpg', text: 'Bridge' },
    { image: 'maps/roborash6.jpg', text: 'Final Sprint' },
    { image: 'maps/roborash7.jpg', text: 'Pit Stop' },
    { image: 'maps/roborash8.jpg', text: 'Incline Test' },
    { image: 'maps/roborash9.jpg', text: 'Sharp Turn' },
    { image: 'maps/roborash10.jpg', text: 'Finish Zone' }
  ];

  const luxLineaItems = [
    { image: 'maps/lux1.jpg', text: 'Initial Curve' },
    { image: 'maps/lux2.jpg', text: 'Parallel Path' },
    { image: 'maps/lux3.jpg', text: 'Cross Section' },
    { image: 'maps/lux4.jpg', text: 'Loop Turn' },
    { image: 'maps/lux5.jpg', text: 'Double Bend' },
    { image: 'maps/lux6.jpg', text: 'Speed Zone' },
    { image: 'maps/lux7.jpg', text: 'Precision Area' },
    { image: 'maps/lux8.jpg', text: 'End Trail' },
    { image: 'maps/lux9.jpg', text: 'Final Curve' },
    { image: 'maps/lux10.jpg', text: 'Finish Line' }
  ];

  function renderLinearGallery(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = items.map((item) => (
      `\n      <div class="gallery-item">\n        <img src="${item.image}" alt="${item.text}">\n        <h3>${item.text}</h3>\n      </div>\n    `)).join('');

    // Hover parallax-like tilt
    container.querySelectorAll('.gallery-item').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        el.style.transform = `translateY(-6px) rotateX(${dy * -4}deg) rotateY(${dx * 6}deg)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  // Render both galleries
  renderLinearGallery('roborash-gallery', roboRashItems);
  renderLinearGallery('luxlinea-gallery', luxLineaItems);

  // Fade-in on scroll using IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

  document.querySelectorAll('.scroll-reveal-block, .circular-gallery-container').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 700ms ease, transform 700ms ease';
    observer.observe(el);
  });
});


