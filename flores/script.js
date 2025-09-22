const container = document.querySelector('.flower-container');
const surpriseBtn = document.getElementById('surpriseBtn');
const emoji = "🌻";

// Función para crear flores que flotan hacia arriba
function createFlower(extra = false) {
  const flower = document.createElement('div');
  flower.classList.add('flower');
  flower.textContent = emoji;

  const size = Math.random() * 30 + 20;
  flower.style.left = Math.random() * 100 + 'vw';
  flower.style.fontSize = `${size}px`;
  flower.style.animationDuration = (Math.random() * 5 + 5) + 's';
  flower.style.animationDelay = extra ? '0s' : (Math.random() * 3) + 's';

  container.appendChild(flower);

  // Eliminar después de que termine la animación
  setTimeout(() => flower.remove(), 10000);
}

// Generar flores de base cada 400ms
setInterval(() => createFlower(), 400);

// Función para crear explosión de fuegos artificiales con partículas y flor
function explodeFlower(x, y) {
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    particle.textContent = "✨";
    particle.classList.add('particle');
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    container.appendChild(particle);

    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * 60 + 40;

    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius;

    particle.animate([
      { transform: 'translate(0, 0)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
    ], {
      duration: 1000,
      easing: 'ease-out',
      fill: 'forwards'
    });

    setTimeout(() => particle.remove(), 1000);
  }

  const flower = document.createElement('div');
  flower.textContent = emoji;
  flower.classList.add('flower');
  flower.style.position = 'absolute';
  flower.style.left = x - 15 + 'px';
  flower.style.top = y - 15 + 'px';
  flower.style.animation = 'none';
  flower.style.fontSize = '24px';

  container.appendChild(flower);

  setTimeout(() => flower.remove(), 3000);
}

// Lanzar explosión cada 3 segundos en zona aleatoria arriba
setInterval(() => {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight * 0.6;
  explodeFlower(x, y);
}, 3000);

// Botón para disparar extra flores
surpriseBtn.addEventListener('click', () => {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => createFlower(true), i * 100);
  }
});
