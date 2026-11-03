        document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. ANIMAÇÃO DE TEXTO (SCROLL)
       ========================================== */
    const visitaTexto = document.querySelector('.visita-texto');

    if (visitaTexto) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // Entra na tela: anima. Sai da tela: reseta, para repetir depois.
                entry.target.classList.toggle('animate-in', entry.isIntersecting);
            });
        }, { threshold: 0.2 });

        observer.observe(visitaTexto);
    }

    /* ==========================================
       2. ENVIO DO FORMULÁRIO (SIMULADO)
       ========================================== */
        const form = document.getElementById('formAgendamento');
        const mensagemSucesso = document.getElementById('mensagemSucesso');
        const tituloForm = document.querySelector('.form-wrapper h2');

    if (form && mensagemSucesso) {
        const btn = form.querySelector('.btn-agendar');
        const textoOriginal = btn.innerHTML;       
        const TEMPO_MENSAGEM_MS = 3000;  // quanto tempo a mensagem fica na tela

        form.addEventListener('submit', (e) => {
            e.preventDefault();   // não recarrega a página

        btn.innerHTML = 'Enviando...';
        btn.style.opacity = '0.7';
        btn.style.cursor = 'wait';
        btn.disabled = true;

        setTimeout(() => {
            // Mostra a mensagem de sucesso
            form.style.display = 'none';
            if (tituloForm) tituloForm.style.display = 'none';
            mensagemSucesso.style.display = 'block';
            form.reset();

            // Depois de alguns segundos, volta ao formulário para a próxima pessoa
            setTimeout(() => {
                mensagemSucesso.style.display = 'none';
                form.style.display = '';
                if (tituloForm) tituloForm.style.display = '';

                btn.innerHTML = textoOriginal;
                btn.style.opacity = '';
                btn.style.cursor = '';
                btn.disabled = false;
            }, TEMPO_MENSAGEM_MS);
        }, 800);
    });
}

    /* ==========================================
       3. MENU HAMBÚRGUER
       ========================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const aberto = navMenu.classList.toggle('active');

            // Anima as linhas (hambúrguer <-> X)
            menuToggle.classList.toggle('active', aberto);

            // Acessibilidade
            menuToggle.setAttribute('aria-expanded', aberto);
            menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
        });
    }

    /* ==========================================
       4. CARROSSEL (SETAS, BOLINHAS, AUTOPLAY E SWIPE)
       ========================================== */
    const viewport = document.querySelector('.carousel-viewport');
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const btnNext = document.querySelector('.carousel-btn.next');
    const btnPrev = document.querySelector('.carousel-btn.prev');
    const dotsBox = document.querySelector('.carousel-dots');

    if (track && slides.length > 0) {
        const AUTOPLAY_MS = 4000;
        const SWIPE_MIN_PX = 50;

        let currentIndex = 0;
        let autoPlayInterval;

        // Cria as bolinhas (uma por slide)
        const dots = [];
        if (dotsBox) {
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                dot.setAttribute('role', 'tab');
                dot.setAttribute('aria-label', `Ir para o slide ${i + 1}`);
                dot.addEventListener('click', () => {
                    goTo(i);
                    resetAutoPlay();
                });
                dotsBox.appendChild(dot);
                dots.push(dot);
            });
        }

        // Move o carrossel e atualiza as bolinhas
        function goTo(index) {
            currentIndex = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            dots.forEach((dot, i) => {
                const ativo = i === currentIndex;
                dot.classList.toggle('active', ativo);
                dot.setAttribute('aria-selected', ativo);
            });
        }

        const nextSlide = () => goTo(currentIndex + 1);
        const prevSlide = () => goTo(currentIndex - 1);

        // Autoplay
        function startAutoPlay() {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, AUTOPLAY_MS);
        }

        // Se o usuário interagir, reinicia o tempo
        function resetAutoPlay() {
            startAutoPlay();
        }

        // Setas
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                nextSlide();
                resetAutoPlay();
            });
        }

        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                prevSlide();
                resetAutoPlay();
            });
        }

        // Swipe (deslizar o dedo no celular)
        if (viewport) {
            let startX = 0;
            let startY = 0;

            viewport.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            }, { passive: true });

            viewport.addEventListener('touchend', (e) => {
                const dx = e.changedTouches[0].clientX - startX;
                const dy = e.changedTouches[0].clientY - startY;

                // Só conta se o movimento for mais horizontal que vertical
                // (assim a rolagem da página não troca o slide sem querer)
                if (Math.abs(dx) > SWIPE_MIN_PX && Math.abs(dx) > Math.abs(dy)) {
                    if (dx < 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                    resetAutoPlay();
                }
            }, { passive: true });
        }

        goTo(0);
        startAutoPlay();

        /* ==========================================
        3.1 LINKS INTERNOS (#agendar etc.)
        ========================================== */
        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener('click', (e) => {
            const id = link.getAttribute('href');
            if (id.length < 2) return;      

            const target = document.querySelector(id);
            if (!target) return;

        e.preventDefault();

        // Fecha o menu mobile, se estiver aberto
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu');
        }

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', id);
        });
    });

    /* ==========================================   
       5. ANIMAÇÃO DA SEÇÃO AGENDE UMA VISITA
       ========================================== */
        const agendar = document.querySelector('.agevisita');
        const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (agendar && !reduzMovimento) {
        agendar.classList.add('reveal-on');

        const agendarObserver = new IntersectionObserver(([entry]) => {
            agendar.classList.toggle('in-view', entry.isIntersecting);
        }, { threshold: 0.15 });

        agendarObserver.observe(agendar);
    }
    }
});

