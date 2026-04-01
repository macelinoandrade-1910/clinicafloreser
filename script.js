/**
 * CLÍNICA FLORESER - Script Principal
 * Desenvolvido por Macelino Andrade
 * Versão Final: Menu Blindado + Animações Rápidas
 */

// 1. VARIÁVEIS GLOBAIS
let hamburger, navMenu;

// 2. CONFIGURAÇÃO DO OBSERVADOR DE INTERSEÇÃO (Animações de Scroll)
const observerOptions = {
    threshold: 0.01, // Aparece assim que o primeiro pixel toca a tela
    rootMargin: '0px 0px 100px 0px' // Carrega antes de entrar totalmente na visão
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 3. INICIALIZAÇÃO DO DOM
document.addEventListener('DOMContentLoaded', () => {
    hamburger = document.querySelector('.hamburger');
    navMenu = document.querySelector('.navMenu');
    const yearEl = document.getElementById('year');

    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- LÓGICA DO MENU HAMBURGUER ---
    if (hamburger && navMenu) {
        
        const resetHamburgerIcon = () => {
            const spans = hamburger.querySelectorAll('span');
            if (spans.length === 3) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        };

        window.closeMenu = function() {
            navMenu.classList.remove('active');
            resetHamburgerIcon();
        };

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // [CORREÇÃO] Impede que o clique feche o menu imediatamente
            navMenu.classList.toggle('active');
            const spans = hamburger.querySelectorAll('span');

            if (navMenu.classList.contains('active')) {
                if (spans.length === 3) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                }
            } else {
                resetHamburgerIcon();
            }
        });

        document.querySelectorAll('.navMenu a').forEach(link => {
            link.addEventListener('click', () => window.closeMenu());
        });
    }

    // --- 4. ANIMAÇÃO DOS CARDS (VELOCIDADE OTIMIZADA) ---
    const animatedElements = document.querySelectorAll(
        '.service-card, .pillar, .team-member, .contact-info, .contact-form-container, .reveal'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)'; // Movimento menor = sensação de mais rapidez
        el.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        el.style.transitionDelay = `${(index % 3) * 0.05}s`; // Cascata mais veloz
        observer.observe(el);
    });

    // --- 5. WHATSAPP WIDGET ---
    const whatsappWidget = document.querySelector('.wc_whatsapp_app');
    if (whatsappWidget && !localStorage.getItem('wc_whatsapp_shown')) {
        setTimeout(() => {
            whatsappWidget.classList.add('show-primary');
            setTimeout(() => whatsappWidget.classList.remove('show-primary'), 8000);
            localStorage.setItem('wc_whatsapp_shown', 'true');
        }, 4000);
    }
});

// 6. EVENTOS DE INTERAÇÃO GLOBAL
document.addEventListener('click', (event) => {
    if (navMenu && hamburger && navMenu.classList.contains('active')) {
        const isClickInside = navMenu.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInside) {
            window.closeMenu();
        }
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        window.closeMenu();
    }
});

// 7. MÁSCARA DE TELEFONE
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 11) v = v.substring(0, 11);
        if (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        else if (v.length > 5) v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
        else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
        else v = v.replace(/^(\d*)/, "($1");
        e.target.value = v;
    });
}

// 8. FORMULÁRIO DE CONTATO
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = encodeURIComponent(document.getElementById('name').value);
        const phone = encodeURIComponent(document.getElementById('phone').value);
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