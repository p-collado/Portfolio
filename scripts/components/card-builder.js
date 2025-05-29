// card-builder.js
// Constructor de tarjetas de proyectos reutilizable

class ProjectCardBuilder {
    constructor() {
        this.animations = {
            fadeIn: 'fadeInUp',
            slideIn: 'slideInLeft',
            scaleIn: 'scaleIn'
        };
    }

    /**
     * Crea una tarjeta de proyecto completa
     * @param {Object} project - Datos del proyecto
     * @param {Object} options - Opciones de configuración
     * @returns {HTMLElement} - Elemento DOM de la tarjeta
     */
    createProjectCard(project, options = {}) {
        const {
            showAnimation = false,
            customClass = '',
            animationType = 'fadeIn'
        } = options;

        // Crear contenedor principal
        const card = document.createElement('div');
        card.className = this._getCardClasses(project, customClass);
        card.setAttribute('data-project-id', project.id);

        if (showAnimation) {
            card.classList.add('animate__animated', `animate__${animationType}`);
        }

        // Crear imagen/icono del proyecto
        const image = this._createProjectImage(project);
        card.appendChild(image);

        // Crear contenido de la tarjeta
        const content = this._createProjectContent(project);
        card.appendChild(content);

        // Agregar event listeners
        this._attachEventListeners(card, project);

        return card;
    }

    /**
     * Crea múltiples tarjetas para una lista de proyectos
     * @param {Array} projects - Array de proyectos
     * @param {HTMLElement} container - Contenedor donde insertar las tarjetas
     * @param {Object} options - Opciones de configuración
     */
    createProjectGrid(projects, container, options = {}) {
        // Limpiar contenedor
        container.innerHTML = '';

        projects.forEach((project, index) => {
            const cardOptions = {
                ...options,
                animationDelay: index * 100 // Retraso escalonado para animaciones
            };

            const card = this.createProjectCard(project, cardOptions);
            
            if (cardOptions.animationDelay && options.showAnimation) {
                card.style.animationDelay = `${cardOptions.animationDelay}ms`;
            }

            container.appendChild(card);
        });
    }

    /**
     * Actualiza una tarjeta existente con nuevos datos
     * @param {HTMLElement} card - Tarjeta a actualizar
     * @param {Object} newData - Nuevos datos del proyecto
     */
    updateProjectCard(card, newData) {
        const content = card.querySelector('.project-content');
        if (content) {
            content.innerHTML = '';
            content.appendChild(this._createProjectContent(newData));
        }
    }

    /**
     * Filtra y muestra tarjetas basado en criterios
     * @param {HTMLElement} container - Contenedor de tarjetas
     * @param {Function} filterFn - Función de filtro
     */
    filterCards(container, filterFn) {
        const cards = container.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            const projectId = card.getAttribute('data-project-id');
            const project = getProjectById(projectId); // Función del módulo de datos
            
            if (filterFn(project)) {
                card.style.display = 'block';
                card.classList.add('animate__animated', 'animate__fadeIn');
            } else {
                card.style.display = 'none';
            }
        });
    }

    // ============ MÉTODOS PRIVADOS ============

    /**
     * Genera las clases CSS para la tarjeta
     */
    _getCardClasses(project, customClass) {
        let classes = ['project-card'];
        
        if (project.featured) classes.push('featured-project');
        if (project.placeholder) classes.push('placeholder-card');
        if (project.category) classes.push('tech-project');
        if (customClass) classes.push(customClass);
        
        return classes.join(' ');
    }

    /**
     * Crea el elemento de imagen/icono del proyecto
     */
    _createProjectImage(project) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'project-image';
        
        if (project.imageUrl) {
            const img = document.createElement('img');
            img.src = project.imageUrl;
            img.alt = project.title;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            imageContainer.appendChild(img);
        } else {
            imageContainer.textContent = project.icon || '🎮';
        }

        return imageContainer;
    }

    /**
     * Crea el contenido principal de la tarjeta
     */
    _createProjectContent(project) {
        const content = document.createElement('div');
        content.className = 'project-content';

        // Badge si es destacado
        if (project.badge) {
            const badge = document.createElement('div');
            badge.className = 'project-badge';
            badge.textContent = project.badge;
            content.appendChild(badge);
        }

        // Título
        const title = document.createElement('h3');
        title.className = 'project-title';
        title.textContent = project.title;
        content.appendChild(title);

        // Descripción
        const description = document.createElement('p');
        description.className = 'project-description';
        description.textContent = project.description;
        content.appendChild(description);

        // Tecnologías
        if (project.technologies && project.technologies.length > 0) {
            const techContainer = this._createTechTags(project.technologies);
            content.appendChild(techContainer);
        }

        // Enlaces
        if (project.links && project.links.length > 0) {
            const linksContainer = this._createProjectLinks(project.links);
            content.appendChild(linksContainer);
        }

        return content;
    }

    /**
     * Crea los tags de tecnologías
     */
    _createTechTags(technologies) {
        const container = document.createElement('div');
        container.className = 'project-tech';

        technologies.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            container.appendChild(tag);
        });

        return container;
    }

    /**
     * Crea los enlaces del proyecto
     */
    _createProjectLinks(links) {
        const container = document.createElement('div');
        container.className = 'project-links';

        links.forEach(link => {
            const anchor = document.createElement('a');
            anchor.href = link.url;
            anchor.className = `project-link ${link.type || 'secondary'}`;
            anchor.textContent = link.text;
            
            if (link.type === 'disabled') {
                anchor.style.pointerEvents = 'none';
            }
            
            if (link.external) {
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
            }

            container.appendChild(anchor);
        });

        return container;
    }

    /**
     * Agrega event listeners a la tarjeta
     */
    _attachEventListeners(card, project) {
        // Hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });

        // Click handler para modal o navegación
        card.addEventListener('click', (e) => {
            // Evitar disparar si se hace click en un enlace
            if (e.target.classList.contains('project-link')) {
                return;
            }
            
            this._handleCardClick(project, card);
        });
    }

    /**
     * Maneja el click en la tarjeta
     */
    _handleCardClick(project, card) {
        // Disparar evento personalizado
        const event = new CustomEvent('projectCardClick', {
            detail: { project, card },
            bubbles: true
        });
        
        card.dispatchEvent(event);
        
        // Log para desarrollo
        console.log('Clicked on project:', project.title);
    }
}

// Utilidades adicionales
const CardUtils = {
    /**
     * Crea un loader/placeholder mientras cargan los proyectos
     */
    createLoadingCard() {
        const card = document.createElement('div');
        card.className = 'project-card loading-card';
        card.innerHTML = `
            <div class="project-image" style="background: linear-gradient(45deg, #333, #555);">
                <div class="loading-spinner">⚡</div>
            </div>
            <div class="project-content">
                <div class="loading-placeholder" style="height: 20px; background: #333; margin-bottom: 10px; border-radius: 4px;"></div>
                <div class="loading-placeholder" style="height: 60px; background: #333; margin-bottom: 15px; border-radius: 4px;"></div>
                <div class="loading-placeholder" style="height: 30px; background: #333; border-radius: 4px;"></div>
            </div>
        `;
        return card;
    },

    /**
     * Anima la entrada de las tarjetas
     */
    animateCardsIn(container, delay = 100) {
        const cards = container.querySelectorAll('.project-card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * delay);
        });
    },

    /**
     * Crea un mensaje cuando no hay proyectos
     */
    createEmptyState(message = 'No hay proyectos disponibles') {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.style.textAlign = 'center';
        emptyState.style.padding = '3rem';
        emptyState.style.color = '#a1a1aa';
        emptyState.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">📭</div>
            <p>${message}</p>
        `;
        return emptyState;
    }
};

// Instancia global del constructor
const projectCardBuilder = new ProjectCardBuilder();

// Exportar para otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProjectCardBuilder, CardUtils, projectCardBuilder };
}