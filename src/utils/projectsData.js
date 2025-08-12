export const projects = [
  {
    title: "3DPortfolio",
    can: "/images/projects/3dPortfolio/3dPortfolioCan.png",
    images: [
      { src: "/images/projects/3dPortfolio/gif1.gif", alt: "Image1" },
      { src: "/images/projects/3dPortfolio/gif2.gif", alt: "Image2" },
      { src: "/images/projects/3dPortfolio/gif3.gif", alt: "Image3" },
      { src: "/images/projects/3dPortfolio/gif4.gif", alt: "Image4" },
    ],
    description: {
      en: "3DPortfolio is an interactive personal portfolio built with Three.js and React Three Fiber. It presents a 3D environment with animated objects that represent sections like About Me, Contact, Music, Games, and Projects. HTML content is rendered directly on 3D model screens, enhanced with GSAP animations and multilingual support.",
      es: "3DPortfolio es un portafolio personal interactivo creado con Three.js y React Three Fiber. Presenta un entorno 3D con objetos animados que representan secciones como Sobre Mí, Contáctame, Música, Juegos y Proyectos. El contenido HTML se muestra directamente en pantallas de modelos 3D, con animaciones de GSAP y soporte multilingüe.",
    },
    features: {
      en: [
        "Immersive 3D navigation with interactive portfolio sections.",
        "HTML content embedded on 3D model surfaces.",
        "Dynamic hover effects and object interactions.",
        "Smooth GSAP-powered camera transitions.",
        "Multilanguage project descriptions.",
      ],
      es: [
        "Navegación 3D inmersiva con secciones interactivas.",
        "Contenido HTML incrustado en superficies de modelos 3D.",
        "Efectos dinámicos al pasar el ratón y objetos interactivos.",
        "Transiciones suaves de cámara con GSAP.",
        "Descripciones de proyectos en varios idiomas.",
      ],
    },
    date: { en: "August 2025", es: "Agosto de 2025" },
    github: "https://github.com/ItO210/3d-portfolio-website",
  },

  {
    title: "Cicata Nexus",
    can: "/images/projects/CicataNexus/CicataNexusCan.png",
    images: [
      { src: "/images/projects/CicataNexus/1.png", alt: "Image1" },
      { src: "/images/projects/CicataNexus/2.png", alt: "Image2" },
      { src: "/images/projects/CicataNexus/3.png", alt: "Image3" },
      { src: "/images/projects/CicataNexus/4.png", alt: "Image4" },
    ],
    description: {
      en: "Cicata Nexus is a web-based service request platform that centralizes equipment, materials, and support requests. It features role-specific dashboards, scheduling tools, and inventory tracking to streamline laboratory operations.",
      es: "Cicata Nexus es una plataforma web para la gestión de solicitudes de servicios que centraliza solicitudes de equipo, materiales y soporte. Cuenta con paneles específicos por rol, herramientas de programación y control de inventario para optimizar operaciones de laboratorio.",
    },
    features: {
      en: [
        "Centralized requests for equipment, materials, and support.",
        "Role-specific dashboards for users, managers, and admins.",
        "Integrated scheduling and calendar views.",
        "Inventory tracking and request history.",
        "Responsive design for desktop and mobile access.",
      ],
      es: [
        "Solicitudes centralizadas de equipo, materiales y soporte.",
        "Paneles específicos por rol para usuarios, gestores y administradores.",
        "Programación integrada con vistas de calendario.",
        "Control de inventario e historial de solicitudes.",
        "Diseño adaptable para acceso en escritorio y móvil.",
      ],
    },
    date: { en: "August 2025", es: "Agosto de 2025" },
    github: "https://github.com/ItO210/service-request-manager",
  },

  {
    title: "HealthSync",
    can: "/images/projects/HealthSync/HealthSyncCan.png",
    images: [
      { src: "/images/projects/HealthSync/image1.png", alt: "Image1" },
      { src: "/images/projects/HealthSync/image2.png", alt: "Image2" },
      { src: "/images/projects/HealthSync/image3.png", alt: "Image3" },
      { src: "/images/projects/HealthSync/image4.png", alt: "Image4" },
    ],
    description: {
      en: "HealthSync is a hospital equipment ticket management system for web and Android. Staff can report equipment issues online, while technicians and admins handle tickets through the mobile app. It supports repair tracking, evidence uploads, performance monitoring, and account management.",
      es: "HealthSync es un sistema de gestión de tickets de equipos hospitalarios para web y Android. El personal reporta problemas en línea, mientras que técnicos y administradores gestionan tickets desde la app. Permite seguimiento de reparaciones, carga de evidencias, control de rendimiento y administración de cuentas.",
    },
    features: {
      en: [
        "Web form for reporting equipment issues.",
        "Android app for technicians and admins.",
        "Ticket states for progress tracking.",
        "Evidence upload requirement for certain tickets.",
        "Performance stats and account management tools.",
      ],
      es: [
        "Formulario web para reportar problemas de equipos.",
        "Aplicación Android para técnicos y administradores.",
        "Estados de ticket para seguimiento del progreso.",
        "Carga obligatoria de evidencias para ciertos tickets.",
        "Estadísticas de rendimiento y gestión de cuentas.",
      ],
    },
    date: { en: "September 2024", es: "Septiembre de 2024" },
    github: "https://github.com/ItO210/equipment-ticket-system",
  },

  {
    title: "AIRacingLine",
    can: "/images/projects/AIRacingLine/AIRacingLineCan.png",
    images: [
      { src: "/images/projects/AIRacingLine/image1.png", alt: "Image1" },
      { src: "/images/projects/AIRacingLine/image2.png", alt: "Image2" },
      { src: "/images/projects/AIRacingLine/image3.png", alt: "Image3" },
      { src: "/images/projects/AIRacingLine/image4.png", alt: "Image4" },
    ],
    description: {
      en: "AIRacingLine is an AI-powered Unity tool that generates optimal racing lines and gives speed feedback in real time. An ML-Agents-trained AI drives the ideal path, which is recorded and shown with dynamic colors to guide acceleration and braking.",
      es: "AIRacingLine es una herramienta para Unity con IA que genera líneas de carrera óptimas y ofrece retroalimentación de velocidad en tiempo real. Una IA entrenada con ML-Agents conduce el camino ideal, que se registra y muestra con colores dinámicos para guiar aceleración y frenado.",
    },
    features: {
      en: [
        "Trains AI agents with reward shaping and sensor tuning.",
        "Generates racing lines from AI driving data.",
        "Real-time color feedback for speed zones.",
        "Integration with Unity ML-Agents.",
        "Visual guidance for acceleration and braking.",
      ],
      es: [
        "Entrena agentes IA con modelado de recompensas y ajuste de sensores.",
        "Genera líneas de carrera a partir de datos de conducción IA.",
        "Retroalimentación de color en tiempo real para zonas de velocidad.",
        "Integración con Unity ML-Agents.",
        "Guía visual para aceleración y frenado.",
      ],
    },
    date: { en: "September 2024", es: "Septiembre de 2024" },
    github: "https://github.com/ItO210/ai-racing-line",
  },

  {
    title: "CodeCuisine",
    can: "/images/projects/CodeCuisine/CodeCuisineCan.png",
    images: [
      { src: "/images/projects/CodeCuisine/image1.png", alt: "Image1" },
      { src: "/images/projects/CodeCuisine/gif1.gif", alt: "Image2" },
      { src: "/images/projects/CodeCuisine/image2.png", alt: "Image3" },
      { src: "/images/projects/CodeCuisine/image3.png", alt: "Image4" },
      { src: "/images/projects/CodeCuisine/image4.png", alt: "Image5" },
    ],
    description: {
      en: "CodeCuisine is an educational game that teaches programming through a hamburger-making challenge. Players use drag-and-drop logic blocks to build recipes, and the system checks their logic with instant feedback. It includes progress tracking and an admin dashboard.",
      es: "CodeCuisine es un juego educativo que enseña programación mediante un reto de hacer hamburguesas. Los jugadores usan bloques lógicos de arrastrar y soltar para crear recetas, y el sistema revisa su lógica al instante. Incluye seguimiento de progreso y panel de administración.",
    },
    features: {
      en: [
        "Teaches programming basics through play.",
        "Drag-and-drop logic block interface.",
        "Instant feedback on recipe logic.",
        "Tracks user progress and rankings.",
        "Admin dashboard for monitoring activity.",
      ],
      es: [
        "Enseña fundamentos de programación mediante juego.",
        "Interfaz con bloques lógicos de arrastrar y soltar.",
        "Retroalimentación instantánea sobre la lógica.",
        "Seguimiento de progreso y clasificaciones.",
        "Panel de administración para monitorear actividad.",
      ],
    },
    date: { en: "March 2024", es: "Marzo de 2024" },
    github: "https://github.com/ItO210/educational-coding-game",
  },

  {
    title: "AireSano",
    can: "/images/projects/AireSano/AireSanoCan.png",
    images: [
      { src: "/images/projects/AireSano/image1.png", alt: "Image1" },
      { src: "/images/projects/AireSano/image2.png", alt: "Image2" },
      { src: "/images/projects/AireSano/image3.png", alt: "Image3" },
    ],
    description: {
      en: "AireSano is an IoT-based air quality monitoring system using an ESP32 microcontroller. It collects temperature, humidity, and air quality data, sends it to a REST API, stores it in MySQL, and displays it on a web dashboard for real-time and historical tracking.",
      es: "AireSano es un sistema IoT de monitoreo de calidad del aire que usa un microcontrolador ESP32. Recopila datos de temperatura, humedad y calidad del aire, los envía a una API REST, los guarda en MySQL y los muestra en un panel web para seguimiento en tiempo real e histórico.",
    },
    features: {
      en: [
        "Real-time data collection from sensors.",
        "Wi-Fi transmission to a REST API.",
        "Database storage with MySQL.",
        "Web dashboard for data visualization.",
        "Historical trend analysis tools.",
      ],
      es: [
        "Recolección de datos en tiempo real desde sensores.",
        "Transmisión por Wi-Fi a una API REST.",
        "Almacenamiento en base de datos MySQL.",
        "Panel web para visualización de datos.",
        "Herramientas de análisis de tendencias.",
      ],
    },
    date: { en: "September 2023", es: "Septiembre de 2023" },
    github: "https://github.com/ItO210/air-monitoring-system/tree/main",
  },
];
