// projects-data.js
// Datos centralizados de todos los proyectos del portfolio

const PROJECTS_DATA = {
    // Juegos publicados y completos
    publishedGames: [
        {
            id: 'end-of-life',
            title: 'End Of Life',
            icon: '🎮',
            description: 'Un shooter en tercera persona desarrollado con UE5. La ciudad es un cubo de Rubik espejo que rota, cambiando la gravedad del nivel y permitiendo situaciones únicas desde diferentes perspectivas. Utiliza estos cambios de gravedad y herramientas del personaje para enfrentar enemigos y resolver puzzles.',
            technologies: ['Unreal Engine 5', 'C++', 'AI Programming', 'Navmesh', 'Level Streaming'],
            links: [
                { text: '🎮 Jugar Ahora', url: '#', type: 'primary' },
                { text: '📹 Gameplay', url: '#', type: 'secondary' },
                { text: '📖 Dev Blog', url: '#', type: 'secondary' }
            ],
            featured: true,
            badge: 'DESTACADO'
        },
        {
            id: 'next-game-placeholder',
            title: 'Próximo Juego',
            icon: '🎯',
            description: '¿Trabajando en algo nuevo? Este espacio está reservado para tu próximo gran proyecto.',
            technologies: ['En Desarrollo'],
            links: [
                { text: '🔜 Próximamente', url: '#', type: 'disabled' }
            ],
            placeholder: true
        }
    ],

    // Proyectos técnicos y demos
    technicalProjects: [
        {
            id: 'ai-system',
            title: 'Sistema de IA Avanzada',
            icon: '🤖',
            description: 'Demo técnico mostrando comportamientos de IA complejos con FSM, árbol de comportamiento y navegación dinámica en entornos cambiantes.',
            technologies: ['Behavior Trees', 'State Machines', 'Dynamic Navmesh', 'C++'],
            links: [
                { text: '📱 Demo', url: '#', type: 'secondary' },
                { text: '📋 Código', url: '#', type: 'secondary' }
            ],
            category: 'ai'
        },
        {
            id: 'gravity-system',
            title: 'Sistema de Gravedad Dinámica',
            icon: '🌊',
            description: 'Prototipo del sistema de rotación de gravedad usado en End Of Life, con física personalizada y transiciones suaves entre orientaciones.',
            technologies: ['Custom Physics', 'Gravity System', 'Blueprint', 'Level Design'],
            links: [
                { text: '🎮 Probar', url: '#', type: 'secondary' },
                { text: '📐 Breakdown', url: '#', type: 'secondary' }
            ],
            category: 'physics'
        },
        {
            id: 'performance-optimization',
            title: 'Optimización de Performance',
            icon: '⚡',
            description: 'Herramientas y técnicas de profiling desarrolladas para optimizar rendimiento en juegos con alta densidad de objetos y efectos complejos.',
            technologies: ['Performance Profiler', 'LOD System', 'Culling', 'Memory Management'],
            links: [
                { text: '📊 Análisis', url: '#', type: 'secondary' },
                { text: '🛠️ Tools', url: '#', type: 'secondary' }
            ],
            category: 'optimization'
        },
        {
            id: 'level-streaming',
            title: 'Level Streaming Avanzado',
            icon: '🗺️',
            description: 'Sistema de carga dinámica de niveles con predicción de movimiento del jugador y gestión inteligente de memoria para mundos grandes.',
            technologies: ['World Composition', 'Async Loading', 'Memory Pool', 'Predictive Loading'],
            links: [
                { text: '🌍 Demo', url: '#', type: 'secondary' },
                { text: '📚 Documentación', url: '#', type: 'secondary' }
            ],
            category: 'systems'
        }
    ]
};

// Función para obtener todos los juegos publicados
function getPublishedGames() {
    return PROJECTS_DATA.publishedGames;
}

// Función para obtener todos los proyectos técnicos
function getTechnicalProjects() {
    return PROJECTS_DATA.technicalProjects;
}

// Función para obtener un proyecto por ID
function getProjectById(id) {
    const allProjects = [...PROJECTS_DATA.publishedGames, ...PROJECTS_DATA.technicalProjects];
    return allProjects.find(project => project.id === id);
}

// Función para obtener proyectos por categoría
function getProjectsByCategory(category) {
    return PROJECTS_DATA.technicalProjects.filter(project => project.category === category);
}

// Función para obtener proyectos destacados
function getFeaturedProjects() {
    const allProjects = [...PROJECTS_DATA.publishedGames, ...PROJECTS_DATA.technicalProjects];
    return allProjects.filter(project => project.featured);
}

// Función para agregar un nuevo proyecto (útil para expansiones futuras)
function addProject(project, type = 'technical') {
    if (type === 'published') {
        PROJECTS_DATA.publishedGames.push(project);
    } else {
        PROJECTS_DATA.technicalProjects.push(project);
    }
}

// Exportar funciones para usar en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = {
        PROJECTS_DATA,
        getPublishedGames,
        getTechnicalProjects,
        getProjectById,
        getProjectsByCategory,
        getFeaturedProjects,
        addProject
    };
}