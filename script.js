// Quejas CEIP Miguel de Cervantes — mínimo JS para menú móvil y enlaces a Drive

(function () {
  'use strict';

  // -------- Menú móvil --------
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('topNav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Cerrar al pulsar un enlace
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // -------- Enlaces a Drive --------
  // Cuando se conozca el ID del Drive, sustituir DRIVE_BASE por la URL real
  // de la carpeta "1_Para_tu_familia" o por enlaces individuales por documento.
  // Por defecto el botón muestra un mensaje amistoso.
  const DRIVE_BASE = ''; // ej. 'https://drive.google.com/drive/folders/XXXXX'

  document.querySelectorAll('[data-drive]').forEach(el => {
    if (DRIVE_BASE) {
      // Construir URL al fichero correspondiente en Drive
      el.setAttribute('href', DRIVE_BASE);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    } else {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        alert(
          'Las plantillas están en el Google Drive del AMPA.\n\n' +
          'Si todavía no tienes el enlace, escribe al AMPA por los canales habituales ' +
          '(grupo de difusión, correo) y te lo facilitarán.'
        );
      });
    }
  });

  // -------- Animación de barras (efecto multiplicador) --------
  // Activar el ancho cuando entra en viewport
  const bars = document.querySelectorAll('.bar__fill');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'growBar 0.8s ease-out both';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(bar => io.observe(bar));
  }
})();
