// js/main.js

document.addEventListener('DOMContentLoaded', () => {

    // ─── MENÚ MÓVIL ────────────────────────────────────────────────────────────
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

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.getAttribute('aria-hidden') === 'false') {
                closeMenu();
                menuBtn.focus();
            }
        });
    }

    // ─── GALERÍA — generación de cards desde obras.js ───────────────────────────
    const galleryGrid = document.getElementById('gallery-grid');

    if (galleryGrid && typeof OBRAS !== 'undefined') {
        OBRAS.forEach(obra => {
            const card = document.createElement('a');
            card.href      = `obra.html?id=${obra.id}`;
            card.className = 'group block';
            card.innerHTML = `
                <div class="aspect-[3/4] overflow-hidden rounded-xl bg-cement mb-5 relative">
                    <img
                        loading="lazy"
                        src="${obra.imagenPrincipal}"
                        alt="${obra.titulo} — ${obra.material}"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div class="absolute top-4 left-4">
                        <span class="text-[9px] uppercase tracking-widest font-bold bg-white/80 backdrop-blur-sm text-carbon px-3 py-1.5 rounded-full">
                            ${obra.coleccion}
                        </span>
                    </div>
                </div>
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-serif text-xl italic text-carbon group-hover:text-stone transition-colors">${obra.titulo}</h3>
                        <p class="text-stone text-[11px] uppercase tracking-widest mt-1 font-bold">${obra.material} &middot; ${obra.año}</p>
                    </div>
                    <span class="material-symbols-outlined text-stone group-hover:translate-x-1 transition-transform duration-300 mt-1" aria-hidden="true">arrow_forward</span>
                </div>
            `;
            galleryGrid.appendChild(card);
        });
    }

    // ─── FORMULARIO DE CONTACTO ─────────────────────────────────────────────────
    const form         = document.getElementById('contact-form');
    const nameInput    = document.getElementById('name');
    const emailInput   = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn    = document.getElementById('submit-btn');
    const formSuccess  = document.getElementById('form-success');
    const formError    = document.getElementById('form-error');

    if (form) {
        const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

        const checkForm = () => {
            const valid =
                nameInput.value.trim() !== '' &&
                messageInput.value.trim() !== '' &&
                validateEmail(emailInput.value);

            submitBtn.disabled = !valid;
            submitBtn.classList.toggle('bg-carbon',          valid);
            submitBtn.classList.toggle('bg-carbon/50',       !valid);
            submitBtn.classList.toggle('cursor-pointer',     valid);
            submitBtn.classList.toggle('cursor-not-allowed', !valid);
        };

        [nameInput, emailInput, messageInput].forEach(input => {
            input.addEventListener('input', checkForm);
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            submitBtn.disabled    = true;
            submitBtn.textContent = 'Enviando…';

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    form.reset();
                    formSuccess.classList.remove('hidden');
                    formError.classList.add('hidden');
                    submitBtn.classList.add('hidden');
                } else {
                    throw new Error('Error del servidor');
                }
            } catch {
                formError.classList.remove('hidden');
                formSuccess.classList.add('hidden');
                submitBtn.textContent = 'Enviar Mensaje';
                submitBtn.disabled    = false;
                checkForm();
            }
        });
    }

});
