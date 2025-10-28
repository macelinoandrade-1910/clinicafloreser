// Menu Hamburguer (Mobile)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

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

// Formulário de Contato - Integração com WhatsApp
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obter valores do formulário
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Número do WhatsApp da clínica (SUBSTITUA PELO NÚMERO REAL)
    // Formato: código do país + DDD + número (sem espaços ou caracteres especiais)
    // Exemplo: 5541999999999
    const whatsappNumber = '554187868813'; // Número real do WhatsApp
    
    // Montar mensagem para o WhatsApp
    // Montar mensagem para o WhatsApp
    // A mensagem será enviada para o número da clínica, com as informações do cliente
    const whatsappMessage = `Olá! Vi o site da Floreser e gostaria de mais informações.%0A%0A*Meus dados:*%0ANome: ${name}%0AWhatsApp: ${phone}%0A%0AAguardo seu retorno!`;
    
    // URL da API do WhatsApp (para abrir o aplicativo, se possível, ou WhatsApp Web)
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    // Abrir WhatsApp em nova aba
    window.open(whatsappURL, '_blank');
    
    // Limpar formulário após envio
    contactForm.reset();
    
    // Feedback visual (opcional)
    alert('Sua mensagem será enviada para o WhatsApp da Floreser. Você será redirecionado(a) para lá para confirmar o envio. Aguarde um momento!');
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
    const animatedElements = document.querySelectorAll('.service-card, .pillar, .team-member, .contact-info, .contact-form-container');
    
    animatedElements.forEach((el, index) => {
        el.style.setProperty('--delay', index); // ✅ NOVO - stagger delay
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ✅ NOVO - Loading suave de imagens
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
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



// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const carouselItems = document.querySelectorAll('.carousel-item');

    let currentIndex = 0;
    let itemsPerPage = 3; // Default for desktop

    const updateItemsPerPage = () => {
        if (window.innerWidth <= 768) {
            itemsPerPage = 1;
        } else if (window.innerWidth <= 1024) {
            itemsPerPage = 2;
        } else {
            itemsPerPage = 3;
        }
    };

    // const updateCarousel = () => {
        // const itemWidth = carouselItems[0].offsetWidth;
        // carouselTrack.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    // };
	const updateCarousel = () => {
    const itemStyle = window.getComputedStyle(carouselItems[0]);
    const gap = parseInt(itemStyle.marginRight) || 18; // pega o gap
    const itemWidth = carouselItems[0].offsetWidth + gap;
    carouselTrack.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
     };


    prevButton.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = Math.min(carouselItems.length - itemsPerPage, currentIndex + 1);
        updateCarousel();
    });

    window.addEventListener('resize', () => {
        updateItemsPerPage();
        currentIndex = 0; // Reset carousel position on resize
        updateCarousel();
    });

    updateItemsPerPage();
    updateCarousel();
});



// Máscara de telefone para o campo de telefone
const phoneInput = document.getElementById('phone');

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
