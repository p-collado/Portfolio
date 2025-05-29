/**
 * FUNCIONALIDAD PRINCIPAL DEL PORTFOLIO
 * ===================================
 * 
 * Este archivo contiene toda la lógica JavaScript del portfolio:
 * - Navegación suave
 * - Efectos de partículas
 * - Generación dinámica de contenido
 * - Efectos visuales e interacciones
 */

// ==========================================
// CONFIGURACIÓN GLOBAL
// ==========================================

const PORTFOLIO = {
    // Configuración de partículas
    particles: {
        count: 50,
        speed: 3,
        maxSize: 2
    },
    
    // Configuración de animaciones
    animations: {
        cardHoverScale: 1.02,
        cardHoverTranslate: -10,
        navigationTransition: 300
    },
    
    // Colores principales
    colors: {
        primary: '#00d4ff',
        secondary: '#7c3aed',
        accent: '#10b981'
    }
};

// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    console.log('🚀 Inicializando portfolio...');
    
    // Inicializar componentes
    initializeNavigation();
    initializeParticles();
    initializeProjectCards();
    initializeScrollEffects();
    initializeContactForm();
    
    // Generar contenido dinámico
    generateGamesSection();
    generateTechnicalProjectsSection();
    generateSkillsSection();
    generateAboutSection();
    
    console.log('✅ Portfolio inicializado correctamente');
}

// ==========================================
// NAVEGACIÓN
// ==========================================

function initializeNavigation() {
    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Actualizar navegación activa
                updateActiveNavigation(targetId);
            }
        });
    });
    
    // Cambiar fondo de navegación al hacer scroll
    window.addEventListener('scroll', handleNavigationScroll);
}

function updateActiveNavigation(activeId) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeId) {
            link.classList.add('active');
        }
    });
}

function handleNavigationScroll() {
    const nav = document.querySelector('nav');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        nav.style.background = 'rgba(15, 15, 30, 0.95)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(15, 15, 30, 0.9)';
        nav.style.boxShadow = 'none';
    }
}

// ==========================================
// SISTEMA DE PARTÍCULAS
// ==========================================

function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Limpiar partículas existentes
    particlesContainer.innerHTML = '';
    
    createParticles(particlesContainer);
}

function createParticles(container) {
    const particleCount = PORTFOLIO.particles.count;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = createSingleParticle();
        container.appendChild(particle);
    }
}

function createSingleParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posición aleatoria
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Animación aleatoria
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    // Tamaño aleatorio
    const size = Math.random() * PORTFOLIO.particles.maxSize + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    return particle;
}

// ==========================================
// EFECTOS DE SCROLL
// ==========================================

function initializeScrollEffects() {
    // Intersection Observer para animaciones al aparecer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observar secciones y cards
    document.querySelectorAll('section, .project-card').forEach(el => {
        observer.observe(el);
    });
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}

// ==========================================
// GENERACIÓN DINÁMICA DE CONTENIDO
// ==========================================

function generateGamesSection() {
    const gamesGrid = document.querySelector('#games .projects-grid');
    if (!gamesGrid) return;
    
    gamesGrid.innerHTML = '';
    
    gamesData.forEach(game => {
        const gameCard = createGameCard(game);
        gamesGrid.appendChild(gameCard);
    });
}

function createGameCard(game) {
    const card = document.createElement('div');
    card.className = `project-card ${game.featured ? 'featured-project' : ''}`;
    if (game.status === 'coming-soon') {
        card.classList.add('placeholder-card');
    }
    
    card.innerHTML = `
        <div class="project-image">${game.image}</div>
        <div class="project-content">
            ${game.featured ? '<div class="project-badge">DESTACADO</div>' : ''}
            <h3 class="project-title">${game.title}</h3>
            <p class="project-description">${game.description}</p>
            <div class="project-tech">
                ${game.technologies.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('')}
            </div>
            <div class="project-links">
                ${game.links.map(link => 
                    `<a href="${link.url}" class="project-link ${link.type}">${link.text}</a>`
                ).join('')}
            </div>
        </div>
    `;
    
    return card;
}

function generateTechnicalProjectsSection() {
    const projectsGrid = document.querySelector('#projects .projects-grid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    
    technicalProjectsData.forEach(project => {
        const projectCard = createTechnicalProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

function createTechnicalProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card tech-project';
    
    card.innerHTML = `
        <div class="project-image">${project.image}</div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('')}
            </div>
            <div class="project-links">
                ${project.links.map(link => 
                    `<a href="${link.url}" class="project-link ${link.type}">${link.text}</a>`
                ).join('')}
            </div>
        </div>
    `;
    
    return card;
}

function generateSkillsSection() {
    const skillsContainer = document.querySelector('.skills');
    if (!skillsContainer) return;
    
    skillsContainer.innerHTML = '';
    
    Object.entries(skillsData).forEach(([category, skills]) => {
        const skillCategory = createSkillCategory(category, skills);
        skillsContainer.appendChild(skillCategory);
    });
}

function createSkillCategory(categoryName, skills) {
    const category = document.createElement('div');
    category.className = 'skill-category';
    
    category.innerHTML = `
        <h3>${categoryName}</h3>
        <ul class="skill-list">
            ${skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
    `;
    
    return category;
}

function generateAboutSection() {
    const aboutText = document.querySelector('.about-text');
    if (!aboutText) return;
    
    aboutText.innerHTML = personalInfo.about
        .map(paragraph => `<p>${paragraph}</p>`)
        .join('');
}

// ==========================================
// INTERACCIONES CON CARDS
// ==========================================

function initializeProjectCards() {
    // Efectos hover mejorados para las cards
    document.addEventListener('mouseenter', function(e) {
        if (e.target.classList.contains('project-card')) {
            enhanceCardHover(e.target, true);
        }
    }, true);
    
    document.addEventListener('mouseleave', function(e) {
        if (e.target.classList.contains('project-card')) {
            enhanceCardHover(e.target, false);
        }
    }, true);
}

function enhanceCardHover(card, isHovering) {
    if (isHovering) {
        card.style.transform = `translateY(${-PORTFOLIO.animations.cardHoverTranslate}px) scale(${PORTFOLIO.animations.cardHoverScale})`;
        card.style.zIndex = '10';
        
        // Efecto de brillo para cards destacadas
        if (card.classList.contains('featured-project')) {
            card.style.boxShadow = '0 25px 50px rgba(0, 212, 255, 0.4)';
        }
    } else {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.zIndex = '1';
        card.style.boxShadow = '';
    }
}

// ==========================================
// FORMULARIO DE CONTACTO
// ==========================================

function initializeContactForm() {
    // Agregar efectos a los enlaces de contacto
    document.querySelectorAll('.contact-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ==========================================
// UTILIDADES Y HELPERS
// ==========================================

// Función para animar elementos al entrar en viewport
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Función para obtener estadísticas del portfolio
function getPortfolioStats() {
    return {
        totalProjects: getTotalProjectsCount(),
        publishedGames: getPublishedProjectsCount(),
        technicalProjects: technicalProjectsData.length,
        topTechnologies: getMostUsedTechnologies().slice(0, 5)
    };
}

// Función para cambiar tema (si quieres agregar tema claro/oscuro)
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Función para compartir proyecto
function shareProject(projectId, platform) {
    const project = getGameById(projectId) || technicalProjectsData.find(p => p.id === projectId);
    if (!project) return;
    
    const shareData = {
        title: `${project.title} - Pedro Collado Portfolio`,
        text: project.description,
        url: window.location.href + '#' + projectId
    };
    
    if (platform === 'native' && navigator.share) {
        navigator.share(shareData);
    } else {
        // Fallback para navegadores que no soportan Web Share API
        copyToClipboard(shareData.url);
        showNotification('¡Enlace copiado al portapapeles!');
    }
}

// Función para copiar al portapapeles
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback para navegadores más antiguos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// ==========================================
// EVENTOS GLOBALES
// ==========================================

// Manejar redimensionamiento de ventana
window.addEventListener('resize', function() {
    // Recalcular partículas si es necesario
    if (window.innerWidth !== this.previousWidth) {
        initializeParticles();
        this.previousWidth = window.innerWidth;
    }
});

// Manejar scroll para animaciones
window.addEventListener('scroll', animateOnScroll);

// Manejar errores de JavaScript
window.addEventListener('error', function(e) {
    console.error('Error en el portfolio:', e.error);
    // En producción, podrías enviar este error a un servicio de logging
});

// ==========================================
// MODO DEBUG (solo en desarrollo)
// ==========================================

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Exponer funciones globalmente para debugging
    window.PORTFOLIO_DEBUG = {
        getStats: getPortfolioStats,
        regenerateContent: function() {
            generateGamesSection();
            generateTechnicalProjectsSection();
            generateSkillsSection();
        },
        showNotification: showNotification,
        data: {
            games: gamesData,
            technical: technicalProjectsData,
            skills: skillsData,
            personal: personalInfo
        }
    };
    
    console.log('🔧 Modo debug activado. Usa window.PORTFOLIO_DEBUG para acceder a funciones de debug.');
}