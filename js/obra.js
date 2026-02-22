// js/obra.js — Lógica de la página de detalle de obra

document.addEventListener('DOMContentLoaded', () => {

    // ─── CARGAR DATOS DE LA OBRA ────────────────────────────────────────────────
    const params = new URLSearchParams(window.location.search);
    const id     = params.get('id');

    if (!id || typeof OBRAS === 'undefined') {
        window.location.href = 'index.html#obras';
        return;
    }

    const obraIndex = OBRAS.findIndex(o => o.id === id);
    if (obraIndex === -1) {
        window.location.href = 'index.html#obras';
        return;
    }

    const obra = OBRAS[obraIndex];

    // ─── POBLAR PÁGINA ──────────────────────────────────────────────────────────
    document.title = `${obra.titulo} | Denise`;

    // Meta description dinámica
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', obra.descripcion.substring(0, 160));

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `${obra.titulo} | Denise`);

    // Hero
    const imgEl = document.getElementById('obra-imagen-principal');
    imgEl.src = obra.imagenPrincipal;
    imgEl.alt = `${obra.titulo} — ${obra.material}`;
    imgEl.style.objectPosition = obra.imagenPosicion || 'center';

    document.getElementById('obra-titulo').textContent      = obra.titulo;
    document.getElementById('obra-material').textContent    = obra.material;
    document.getElementById('obra-año').textContent         = obra.año;
    document.getElementById('obra-dimensiones').textContent = obra.dimensiones;
    document.getElementById('obra-descripcion').textContent = obra.descripcion;

    // ─── FOTOS ADICIONALES ──────────────────────────────────────────────────────
    const galeriaEl       = document.getElementById('obra-galeria');
    const seccionGaleria  = document.getElementById('seccion-galeria');

    if (galeriaEl && obra.imagenes.length > 1) {
        seccionGaleria.classList.remove('hidden');

        obra.imagenes.forEach((imgItem, i) => {
            const imgSrc      = typeof imgItem === 'string' ? imgItem : imgItem.src;
            const imgPosicion = typeof imgItem === 'string' ? 'center' : (imgItem.posicion || 'center');

            const item = document.createElement('div');
            item.className = 'aspect-square overflow-hidden rounded-xl bg-cement cursor-pointer group relative';
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
            item.setAttribute('aria-label', `Ver imagen ${i + 1} de ${obra.titulo}`);
            item.innerHTML = `
                <img
                    loading="lazy"
                    src="${imgSrc}"
                    alt="${obra.titulo} — imagen ${i + 1}"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style="object-position: ${imgPosicion}"
                />
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span class="material-symbols-outlined text-white text-4xl drop-shadow-lg" aria-hidden="true">zoom_in</span>
                </div>
            `;

            const activate = () => openLightbox(imgSrc, `${obra.titulo} — imagen ${i + 1}`);
            item.addEventListener('click', activate);
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
            });

            galeriaEl.appendChild(item);
        });
    }

    // ─── NAVEGACIÓN PREV / NEXT ─────────────────────────────────────────────────
    const prevEl       = document.getElementById('obra-prev');
    const prevTituloEl = document.getElementById('obra-prev-titulo');
    const nextEl       = document.getElementById('obra-next');
    const nextTituloEl = document.getElementById('obra-next-titulo');

    if (obraIndex > 0) {
        const prev = OBRAS[obraIndex - 1];
        prevEl.href = `obra.html?id=${prev.id}`;
        prevTituloEl.textContent = prev.titulo;
        prevEl.classList.remove('invisible');
    }

    if (obraIndex < OBRAS.length - 1) {
        const next = OBRAS[obraIndex + 1];
        nextEl.href = `obra.html?id=${next.id}`;
        nextTituloEl.textContent = next.titulo;
        nextEl.classList.remove('invisible');
    }

    // ─── MENÚ MÓVIL ─────────────────────────────────────────────────────────────
    const menuBtn    = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLines  = menuBtn ? menuBtn.querySelectorAll('.menu-line') : [];

    if (menuBtn && mobileMenu) {
        const openMenu = () => {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenu.classList.add('opacity-100');
            menuBtn.setAttribute('aria-expanded', 'true');
            mobileMenu.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (menuLines.length === 3) {
                menuLines[0].style.transform = 'rotate(45deg) translateY(6px)';
                menuLines[1].style.opacity   = '0';
                menuLines[2].style.transform = 'rotate(-45deg) translateY(-6px)';
            }
        };

        const closeMenu = () => {
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            mobileMenu.classList.remove('opacity-100');
            menuBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (menuLines.length === 3) {
                menuLines[0].style.transform = '';
                menuLines[1].style.opacity   = '';
                menuLines[2].style.transform = '';
            }
        };

        menuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.getAttribute('aria-hidden') === 'false';
            isOpen ? closeMenu() : openMenu();
        });

        mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.getAttribute('aria-hidden') === 'false') {
                closeMenu();
                menuBtn.focus();
            }
        });
    }

    // ─── LIGHTBOX ───────────────────────────────────────────────────────────────
    const lightbox     = document.getElementById('lightbox');
    const lightboxImg  = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.getElementById('close-lightbox');
    let previouslyFocused = null;

    window.openLightbox = (imgSrc, altText) => {
        previouslyFocused = document.activeElement;
        lightboxImg.src = imgSrc;
        lightboxImg.alt = altText || '';

        lightbox.classList.remove('hidden');
        lightbox.classList.add('opacity-0');

        setTimeout(() => {
            lightbox.classList.replace('opacity-0', 'opacity-100');
            lightboxImg.classList.replace('scale-95', 'scale-100');
            closeLightboxBtn.focus();
        }, 50);

        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.replace('opacity-100', 'opacity-0');
        lightboxImg.classList.replace('scale-100', 'scale-95');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            if (previouslyFocused) previouslyFocused.focus();
        }, 300);
        document.body.style.overflow = '';
    };

    if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) closeLightbox();
    });

});
