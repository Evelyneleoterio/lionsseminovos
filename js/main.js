document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       1. ANIMAÇÃO DE TEXTO (SCROLL)
       ========================================== */
    const visitaTexto = document.querySelector('.visita-texto');
    if (visitaTexto) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                } else {
                    entry.target.classList.remove('animate-in');
                }
            });
        }, { threshold: 0.2 });
        observer.observe(visitaTexto);
    }

    /* ==========================================
       2. ENVIO DO FORMULÁRIO E MENSAGEM
       ========================================== */
    const form = document.getElementById('formAgendamento');
    const mensagemSucesso = document.getElementById('mensagemSucesso');
    const tituloForm = document.querySelector('.form-wrapper h2');

    if (form && mensagemSucesso) {
        form.addEventListener('submit', (e) => {
            // O e.preventDefault() impede o erro 405 e o recarregamento da página
            e.preventDefault(); 

            const btn = form.querySelector('.btn-agendar');
            const textoOriginal = btn.innerHTML;

            // Efeito visual de carregamento
            btn.innerHTML = 'Enviando...';
            btn.style.opacity = '0.7';
            btn.style.cursor = 'wait';

            // Simula o envio (0.8s). Em um site real, você usaria fetch() aqui.
            setTimeout(() => {
                // Esconde o título e o form
                form.style.display = 'none';
                if (tituloForm) tituloForm.style.display = 'none';
                
                // Mostra a mensagem de sucesso
                mensagemSucesso.style.display = 'block';
                
                // Limpa os campos
                form.reset();
            }, 800); 
        });
    }
});