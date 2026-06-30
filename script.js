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
  const DRIVE_BASE = 'https://drive.google.com/drive/folders/1qP1Y0E1e_EBHQKlmh6s3KZhD2TZuU4ej'; // ej. 'https://drive.google.com/drive/folders/XXXXX'

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

  // -------- Botones "Copiar" (texto listo para pegar) --------
  document.querySelectorAll('.copybtn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const target = document.querySelector(btn.getAttribute('data-copy'));
      if (!target) return;
      // Texto plano respetando saltos de párrafo
      const text = Array.from(target.querySelectorAll('p'))
        .map(p => p.textContent.trim())
        .join('\n\n');
      const done = () => {
        const original = btn.textContent;
        btn.textContent = '✓ Copiado';
        btn.classList.add('is-copied');
        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove('is-copied');
        }, 1800);
      };
      try {
        await navigator.clipboard.writeText(text);
        done();
      } catch (e) {
        // Fallback para navegadores antiguos / sin permiso de portapapeles
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (_) {}
        document.body.removeChild(ta);
      }
    });
  });

  // -------- Botón flotante "volver arriba" --------
  const toTop = document.createElement('button');
  toTop.className = 'to-top';
  toTop.setAttribute('aria-label', 'Volver arriba');
  toTop.innerHTML = '↑';
  document.body.appendChild(toTop);
  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  const onScrollTop = () => {
    if (window.scrollY > 600) toTop.classList.add('is-visible');
    else toTop.classList.remove('is-visible');
  };
  window.addEventListener('scroll', onScrollTop, { passive: true });
  onScrollTop();

  // -------- Resaltar sección activa en el menú (solo inicio) --------
  if (nav) {
    const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
    const sections = links
      .map(a => document.getElementById(a.getAttribute('href').slice(1)))
      .filter(Boolean);
    if (sections.length && 'IntersectionObserver' in window) {
      const setActive = (id) => {
        links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
      };
      const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      sections.forEach(s => spy.observe(s));
    }
  }

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
