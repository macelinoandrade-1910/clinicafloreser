/**
 * CLÍNICA FLORESER - Script Principal Otimizado
 * Desenvolvido por Macelino Andrade
 */

// 1. VARIÁVEIS GLOBAIS (Acessíveis por todo o script)
let hamburger, navMenu;

// 2. CONFIGURAÇÃO DO OBSERVADOR DE INTERSEÇÃO (Animações de Scroll)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Torna o elemento visível e remove a observação
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 3. INICIALIZAÇÃO DO DOM
document.addEventListener('DOMContentLoaded', () => {
    // Seleção de elementos principais
    hamburger = document.querySelector('.hamburger');
    navMenu = document.querySelector('.navMenu');
    const yearEl = document.getElementById('year');

    // Atualizar ano do copyright automaticamente
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Lógica do Menu Hamburguer
    if (hamburger && navMenu) {
        const resetHamburger = () => {
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => span.style.transform = 'none');
            spans[1].style.opacity = '1';
        };

        // Função Global para fechar o menu
        window.closeMenu = function() {
            navMenu.classList.remove('active');
            resetHamburger();
        };

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const spans = hamburger.querySelectorAll('span');

            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                resetHamburger();
            }
        });

        // Fechar menu ao clicar em qualquer link interno
        document.querySelectorAll('.navMenu a').forEach(link => {
            link.addEventListener('click', () => window.closeMenu());
        });
    }

    // 4. ANIMAÇÃO DOS CARDS E ELEMENTOS REVEAL
    // Seleciona todos os elementos que devem "surgir" na tela
    const animatedElements = document.querySelectorAll(
        '.service-card, .pillar, .team-member, .contact-info, .contact-form-container'
    );

    animatedElements.forEach((el, index) => {
        // Estado inicial (Invisível)
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        // Efeito cascata baseado no índice
        el.style.transitionDelay = `${index * 0.1}s`;
        
        // Começa a observar o elemento
        observer.observe(el);
    });

    // 5. WHATSAPP WIDGET INTELIGENTE
    const whatsappWidget = document.querySelector('.wc_whatsapp_app');
    if (whatsappWidget && !localStorage.getItem('wc_whatsapp_shown')) {
        setTimeout(() => {
            whatsappWidget.classList.add('show-primary');
            setTimeout(() => {
                whatsappWidget.classList.remove('show-primary');
            }, 8000);
            localStorage.setItem('wc_whatsapp_shown', 'true');
        }, 4000);
    }
});

// 6. EVENTOS DE INTERAÇÃO GLOBAL (Fora do DOMContentLoaded)

// Fechar menu ao clicar fora dele
document.addEventListener('click', (event) => {
    if (navMenu && hamburger && navMenu.classList.contains('active')) {
        const isClickInside = navMenu.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInside) {
            window.closeMenu();
        }
    }
});

// Fechar menu com a tecla ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        window.closeMenu();
    }
});

// 7. MÁSCARA DE TELEFONE (Formato Brasil)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 11) v = v.substring(0, 11);
        
        if (v.length > 10) {
            v = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        } else if (v.length > 5) {
            v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
        } else if (v.length > 2) {
            v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
        } else {
            v = v.replace(/^(\d*)/, "($1");
        }
        e.target.value = v;
    });
}

// 8. FORMULÁRIO DE CONTACTO E RASTREAMENTO
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = encodeURIComponent(document.getElementById('name').value);
        const phone = encodeURIComponent(document.getElementById('phone').value);

        // Disparar evento do Google Analytics (se configurado)
        if (typeof gtag === 'function') {
            gtag('event', 'form_submit', {
                'event_category': 'lead',
                'event_label': 'Contact Form'
            });
        }

        // Redirecionar para WhatsApp
        const whatsappURL = `https://wa.me/5541987868813?text=Olá! Gostaria de informações sobre a Floreser.%0A%0A*Nome:* ${name}%0A*WhatsApp:* ${phone}`;
        
        window.open(whatsappURL, '_blank');
        contactForm.reset();
        
        const toast = document.getElementById('toast');
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }
    });
}