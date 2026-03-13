// Menu Hamburguer (Mobile)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

document.getElementById('year').textContent = new Date().getFullYear(); 

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animação do hamburguer
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fechar menu ao clicar fora
document.addEventListener('click', (event) => {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
        // Fecha o menu
        navMenu.classList.remove('active');
        
        // Reseta a animação do hamburger (igual ao seu código atual)
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fechar menu com tecla ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        
        // Reseta a animação do hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});


// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Navegação Suave (Smooth Scroll) com efeito de easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            // Smooth scroll com easing (começa rápido e vai parando)
            const startPosition = window.pageYOffset;
            const distance = offsetPosition - startPosition;
            const duration = 1000; // Duração em milissegundos
            let start = null;

            function easeOutCubic(t) {
                return 1 - Math.pow(1 - t, 3);
            }

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                const easing = easeOutCubic(progress);
                window.scrollTo(0, startPosition + distance * easing);
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);
        }
    });
});

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

// Aplicar animação aos cards de serviço e pilares
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.service-card, .pillar, .team-member, .contact-info, .contact-form-container'
    );
    const images = document.querySelectorAll('img');

    // ⚙️ Função para inicializar as animações
    const iniciarAnimacoes = () => {
        animatedElements.forEach((el, index) => {
            el.style.setProperty('--delay', index);
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    };

    // ⚙️ Função para transição suave das imagens
    const prepararImagens = () => {
        images.forEach(img => {
            // Apenas aplica fade se a imagem ainda não estiver pronta
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
            } else {
                // Garante que imagens já carregadas também apareçam suavemente
                requestAnimationFrame(() => {
                    img.style.opacity = '1';
                    img.style.transition = 'opacity 0.3s ease';
                });
            }
        });
    };

    // ✅ Inicia as animações estruturais assim que o DOM está pronto
    iniciarAnimacoes();

    // ✅ Espera o carregamento total de imagens antes de aplicar a suavização
    if (document.readyState === 'complete') {
        prepararImagens();
    } else {
        window.addEventListener('load', prepararImagens);
    }
});


// Efeito de mudança de cor do header ao rolar
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Máscara de telefone para o campo de telefone
const phoneInput = document.getElementById('phone');
if(phoneInput){
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    
    if (value.length <= 10) {
        // Formato: (XX) XXXX-XXXX
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else {
        // Formato: (XX) XXXXX-XXXX
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
    }
    
    e.target.value = value;
});
}
// WhatsApp Widget Inteligente
document.addEventListener('DOMContentLoaded', function() {
    const whatsappWidget = document.querySelector('.wc_whatsapp_app');
    
    // Mostrar mensagem principal após 4 segundos (apenas primeira visita)
    if (!localStorage.getItem('wc_whatsapp_shown')) {
        setTimeout(function() {
            whatsappWidget.classList.add('show-primary');
            
            // Esconder após 8 segundos
            setTimeout(function() {
                whatsappWidget.classList.remove('show-primary');
            }, 8000);
            
            // Marcar como mostrado (não mostra novamente por 7 dias)
            localStorage.setItem('wc_whatsapp_shown', 'true');
        }, 4000);
    }
    
    // Esconder mensagem ao clicar nela
    const whatsappPrimary = document.querySelector('.wc_whatsapp_primary');
    if (whatsappPrimary) {
        whatsappPrimary.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.display = 'none';
        });
    }
    
    // Esconder mensagem ao passar mouse no botão
    const whatsappBtn = document.querySelector('.wc_whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('mouseenter', function() {
            whatsappWidget.classList.remove('show-primary');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
});

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

const mapIframe = document.querySelector('iframe[data-src]');
if (mapIframe) {
  mapObserver.observe(mapIframe);
}

// ==========================================================================
// RASTREAMENTO DE CONVERSÕES - CORRIGIDO
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
// ✅ APENAS ESTE BLOCO - FORMULÁRIO DE CONTATO UNIFICADO
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 🔥 MEDIR PERFORMANCE
    const startTime = performance.now();
    
    // 1. DADOS DO FORMULÁRIO (rápido)
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    
    // 2. WHATSAPP (ação principal primeiro)
    const whatsappNumber = '5541987868813';
    const whatsappMessage = `Olá! Gostaria de informações sobre a Floreser.%0A%0A*Nome:* ${name}%0A*WhatsApp:* ${phone}`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    // 🔥 ABRIR WHATSAPP IMEDIATAMENTE (não bloqueante)
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 0);
    
    // 3. RASTREAMENTO (não bloqueante)
    setTimeout(() => {
        gtag('event', 'form_submit', {
            'event_category': 'lead',
            'event_label': 'Contact Form', 
            'value': 1
        }); 
    }, 0);
    
    // 4. FEEDBACK VISUAL (toast)
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    // 5. LIMPAR FORMULÁRIO
    contactForm.reset();
    
    // 6. REMOVER TOAST APÓS 3 SEGUNDOS
    setTimeout(() => {
        toast.classList.remove('show');
        
        // 🔥 LOG DE PERFORMANCE
        const endTime = performance.now(); 
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
