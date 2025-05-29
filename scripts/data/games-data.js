/**
 * DATOS DE JUEGOS PUBLICADOS
 * ========================
 * 
 * Este archivo contiene toda la información de tus juegos publicados.
 * Para agregar un nuevo juego, simplemente copia la estructura de un juego existente
 * y modifica los valores.
 * 
 * ESTRUCTURA DE UN JUEGO:
 * - id: identificador único (sin espacios, solo letras y números)
 * - title: nombre del juego
 * - description: descripción detallada
 * - image: emoji o ruta a imagen (ej: "images/mi-juego.jpg")
 * - technologies: array de tecnologías usadas
 * - links: enlaces del juego (texto y URL)
 * - featured: true/false - si es un juego destacado
 * - status: "published" | "coming-soon" | "in-development"
 */

const gamesData = [
    {
        id: "end-of-life",
        title: "End Of Life",
        description: `Un shooter en tercera persona desarrollado con UE5. La ciudad es un cubo de Rubik espejo que rota, 
                     cambiando la gravedad del nivel y permitiendo situaciones únicas desde diferentes perspectivas. 
                     Utiliza estos cambios de gravedad y herramientas del personaje para enfrentar enemigos y resolver puzzles.`,
        image: "🎮", // Puedes cambiar esto por "images/end-of-life.jpg"
        technologies: [
            "Unreal Engine 5",
            "C++",
            "AI Programming",
            "Navmesh",
            "Level Streaming"
        ],
        links: [
            {
                text: "🎮 Jugar Ahora",
                url: "#",
                type: "primary"
            },
            {
                text: "📹 Gameplay",
                url: "#",
                type: "secondary"
            },
            {
                text: "📖 Dev Blog",
                url: "#",
                type: "secondary"
            }
        ],
        featured: true,
        status: "published"
    },
    
    // PLACEHOLDER PARA PRÓXIMOS JUEGOS
    {
        id: "coming-soon",
        title: "Próximo Juego",
        description: "¿Trabajando en algo nuevo? Este espacio está reservado para tu próximo gran proyecto.",
        image: "🎯",
        technologies: ["En Desarrollo"],
        links: [
            {
                text: "🔜 Próximamente",
                url: "#",
                type: "disabled"
            }
        ],
        featured: false,
        status: "coming-soon"
    }
];

/**
 * DATOS DE PROYECTOS TÉCNICOS
 * ==========================
 */

const technicalProjectsData = [
    {
        id: "ai-system",
        title: "Sistema de IA Avanzada",
        description: `Demo técnico mostrando comportamientos de IA complejos con FSM, árbol de comportamiento y 
                     navegación dinámica en entornos cambiantes.`,
        image: "🤖",
        technologies: [
            "Behavior Trees",
            "State Machines", 
            "Dynamic Navmesh",
            "C++"
        ],
        links: [
            {
                text: "📱 Demo",
                url: "#",
                type: "secondary"
            },
            {
                text: "📋 Código",
                url: "#",
                type: "secondary"
            }
        ],
        category: "AI"
    },
    {
        id: "gravity-system",
        title: "Sistema de Gravedad Dinámica",
        description: `Prototipo del sistema de rotación de gravedad usado en End Of Life, 
                     con física personalizada y transiciones suaves entre orientaciones.`,
        image: "🌊",
        technologies: [
            "Custom Physics",
            "Gravity System",
            "Blueprint",
            "Level Design"
        ],
        links: [
            {
                text: "🎮 Probar",
                url: "#",
                type: "secondary"
            },
            {
                text: "📐 Breakdown",
                url: "#",
                type: "secondary"
            }
        ],
        category: "Physics"
    },
    {
        id: "performance-optimization",
        title: "Optimización de Performance",
        description: `Herramientas y técnicas de profiling desarrolladas para optimizar rendimiento en 
                     juegos con alta densidad de objetos y efectos complejos.`,
        image: "⚡",
        technologies: [
            "Performance Profiler",
            "LOD System",
            "Culling",
            "Memory Management"
        ],
        links: [
            {
                text: "📊 Análisis",
                url: "#",
                type: "secondary"
            },
            {
                text: "🛠️ Tools",
                url: "#",
                type: "secondary"
            }
        ],
        category: "Optimization"
    },
    {
        id: "level-streaming",
        title: "Level Streaming Avanzado",
        description: `Sistema de carga dinámica de niveles con predicción de movimiento del jugador 
                     y gestión inteligente de memoria para mundos grandes.`,
        image: "🗺️",
        technologies: [
            "World Composition",
            "Async Loading",
            "Memory Pool",
            "Predictive Loading"
        ],
        links: [
            {
                text: "🌍 Demo",
                url: "#",
                type: "secondary"
            },
            {
                text: "📚 Documentación",
                url: "#",
                type: "secondary"
            }
        ],
        category: "Systems"
    }
];

/**
 * DATOS DE HABILIDADES Y EXPERIENCIA
 * =================================
 */

const skillsData = {
    "Desarrollo de Juegos": [
        "Unreal Engine 5",
        "Gameplay Programming", 
        "AI Programming",
        "Performance Profiling"
    ],
    "Herramientas Técnicas": [
        "Navmesh Tool",
        "Level Streaming Tool",
        "C++ Programming",
        "Blueprint System"
    ],
    "Especialidades": [
        "3rd Person Shooters",
        "Gravity Mechanics",
        "Enemy AI",
        "Level Design"
    ]
};

/**
 * INFORMACIÓN PERSONAL
 * ===================
 */

const personalInfo = {
    name: "Pedro Collado Rojas",
    title: "Game Developer & Programmer",
    subtitle: "Creando experiencias únicas en videojuegos con Unreal Engine y tecnologías avanzadas",
    about: [
        "Soy una persona entusiasta de los videojuegos desde adolescente. Comencé a interesarme por la programación de videojuegos a los 15 años usando UE3. Siempre busco mejorar mis habilidades de programación.",
        "Soy una persona de mente abierta, responsable, ordenada y proactiva. Tengo ganas de seguir aprendiendo cosas nuevas y desarrollar características increíbles para crear experiencias únicas en videojuegos."
    ],
    contact: {
        cv: "./cv.pdf",
        email: "#",
        linkedin: "#",
        github: "#"
    }
};

/**
 * FUNCIONES PARA FILTRAR Y OBTENER DATOS
 * ====================================
 */

// Obtener solo juegos publicados
function getPublishedGames() {
    return gamesData.filter(game => game.status === "published");
}

// Obtener solo juegos destacados
function getFeaturedGames() {
    return gamesData.filter(game => game.featured === true);
}

// Obtener juego por ID
function getGameById(id) {
    return gamesData.find(game => game.id === id);
}

// Obtener todos los proyectos técnicos
function getTechnicalProjects() {
    return technicalProjectsData;
}

// Obtener proyectos técnicos por categoría
function getTechnicalProjectsByCategory(category) {
    return technicalProjectsData.filter(project => project.category === category);
}

// Obtener todas las habilidades
function getSkills() {
    return skillsData;
}

// Obtener información personal
function getPersonalInfo() {
    return personalInfo;
}

/**
 * FUNCIONES DE UTILIDAD
 * ====================
 */

// Contar total de proyectos
function getTotalProjectsCount() {
    return gamesData.length + technicalProjectsData.length;
}

// Contar proyectos publicados
function getPublishedProjectsCount() {
    return getPublishedGames().length;
}

// Obtener tecnologías más usadas
function getMostUsedTechnologies() {
    const techCount = {};
    
    // Contar tecnologías de juegos
    gamesData.forEach(game => {
        game.technologies.forEach(tech => {
            techCount[tech] = (techCount[tech] || 0) + 1;
        });
    });
    
    // Contar tecnologías de proyectos técnicos
    technicalProjectsData.forEach(project => {
        project.technologies.forEach(tech => {
            techCount[tech] = (techCount[tech] || 0) + 1;
        });
    });
    
    // Devolver ordenado por uso
    return Object.entries(techCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([tech, count]) => ({ technology: tech, count }));
}

/**
 * CONFIGURACIÓN Y CONSTANTES
 * =========================
 */

const CONFIG = {
    PARTICLES_COUNT: 50,
    ANIMATION_DURATION: 6,
    COLORS: {
        PRIMARY: '#00d4ff',
        SECONDARY: '#7c3aed',
        BACKGROUND: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)'
    },
    BREAKPOINTS: {
        MOBILE: 768,
        TABLET: 1024,
        DESKTOP: 1200
    }
};

// Exportar todo para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        gamesData,
        technicalProjectsData,
        skillsData,
        personalInfo,
        getPublishedGames,
        getFeaturedGames,
        getGameById,
        getTechnicalProjects,
        getTechnicalProjectsByCategory,
        getSkills,
        getPersonalInfo,
        getTotalProjectsCount,
        getPublishedProjectsCount,
        getMostUsedTechnologies,
        CONFIG
    };
}