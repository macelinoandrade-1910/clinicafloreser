// Menu Hamburguer (Mobile)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// [FIX: Bug] Movido para dentro do DOMContentLoaded para garantir que o elemento existe
// [FIX: Manutenção] Função extraída para evitar duplicação em 3 lugares
function resetHamburger() {
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

function closeMenu() {
    navMenu.classList.remove('active');
    resetHamburger();
}

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

// Fechar menu ao clicar fora
document.addEventListener('click', (event) => {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Fechar menu com tecla ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// [FIX: Performance] Smooth scroll JS removido — substituído por scroll-behavior: smooth no CSS.
// Adicione ao seu CSS: html { scroll-behavior: smooth; scroll-padding-top: 80px; }

// Animação de Scroll - Revelar elementos ao rolar a página
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Carregar mapa apenas quando visível
const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target;
            if (iframe.dataset.src) {
                iframe.src = iframe.dataset.src;
            }
            mapObserver.unobserve(iframe);
        }
    });
});

// [FIX: Bug] DOMContentLoaded unificado em um único listener (era dois separados)
document.addEventListener('DOMContentLoaded', () => {
    // [FIX: Bug] #year agora dentro do DOMContentLoaded, evitando null silencioso
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Animação dos cards
    const animatedElements = document.querySelectorAll(
        '.service-card, .pillar, .team-member, .contact-info, .contact-form-container'
    );
    const images = document.querySelectorAll('img');

    const iniciarAnimacoes = () => {
        animatedElements.forEach((el, index) => {
            el.style.setProperty('--delay', index);
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    };

    const prepararImagens = () => {
        images.forEach(img => {
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
            } else {
                requestAnimationFrame(() => {
                    img.style.opacity = '1';
                    img.style.transition = 'opacity 0.3s ease';
                });
            }
        });
    };

    // Lazy loading com classe .loaded para imagens[loading="lazy"]
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });

    iniciarAnimacoes();

    if (document.readyState === 'complete') {
        prepararImagens();
    } else {
        window.addEventListener('load', prepararImagens);
    }

    // WhatsApp Widget Inteligente
    const whatsappWidget = document.querySelector('.wc_whatsapp_app');
    if (whatsappWidget) {
        if (!localStorage.getItem('wc_whatsapp_shown')) {
            setTimeout(function() {
                whatsappWidget.classList.add('show-primary');

                setTimeout(function() {
                    whatsappWidget.classList.remove('show-primary');
                }, 8000);

                localStorage.setItem('wc_whatsapp_shown', 'true');
            }, 4000);
        }

        const whatsappPrimary = document.querySelector('.wc_whatsapp_primary');
        if (whatsappPrimary) {
            whatsappPrimary.addEventListener('click', function(e) {
                e.preventDefault();
                this.style.display = 'none';
            });
        }

        const whatsappBtn = document.querySelector('.wc_whatsapp');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('mouseenter', function() {
                whatsappWidget.classList.remove('show-primary');
            });
        }
    }

    // [FIX: Performance] mapObserver — funciona apenas se o iframe usar data-src no HTML
    const mapIframe = document.querySelector('iframe[data-src]');
    if (mapIframe) {
        mapObserver.observe(mapIframe);
    }
});

// Efeito de mudança de sombra do header ao rolar
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        header.style.boxShadow = window.scrollY > 100
            ? '0 4px 20px rgba(0, 0, 0, 0.15)'
            : '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Máscara de telefone
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length <= 10) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else {
            value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
        }

        e.target.value = value;
    });
}

// ==========================================================================
// RASTREAMENTO DE CONVERSÕES
// ==========================================================================

// 1. WhatsApp e Agendamento
document.querySelectorAll('.btn-agendar, .wc_whatsapp, .btn-automation').forEach(btn => {
    btn.addEventListener('click', function() {
        gtag('event', 'whatsapp_click', {
            'event_category': 'conversion',
            'event_label': this.textContent?.trim() || 'WhatsApp Button',
            'value': 1
        });
    });
});

// 2. Formulário de Contato
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // [FIX: Segurança] encodeURIComponent aplicado nos valores antes de montar a URL
        const name = encodeURIComponent(document.getElementById('name').value);
        const phone = encodeURIComponent(document.getElementById('phone').value);

        const whatsappNumber = '5541987868813';
        const whatsappMessage = `Ol%C3%A1! Gostaria de informa%C3%A7%C3%B5es sobre a Floreser.%0A%0A*Nome:* ${name}%0A*WhatsApp:* ${phone}`;
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

        setTimeout(() => {
            window.open(whatsappURL, '_blank');
        }, 0);

        setTimeout(() => {
            gtag('event', 'form_submit', {
                'event_category': 'lead',
                'event_label': 'Contact Form',
                'value': 1
            });
        }, 0);

        const toast = document.getElementById('toast');
        if (toast) toast.classList.add('show');

        contactForm.reset();

        // [FIX: Manutenção] Logs de performance removidos
        setTimeout(() => {
            if (toast) toast.classList.remove('show');
        }, 3000);
    });
}

// 3. Links WhatsApp genéricos (backup)
document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(link => {
    link.addEventListener('click', function() {
        gtag('event', 'whatsapp_click', {
            'event_category': 'conversion',
            'event_label': 'Generic WhatsApp Link',
            'value': 1
        });
    });
});