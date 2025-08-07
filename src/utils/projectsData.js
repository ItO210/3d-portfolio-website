export const projects = [
  {
    title: "3DPortfolio",
    can: "/images/a.png",
    images: [{ src: "/images/a.png", alt: "First image" }],
    description: {
      en: "3DPortfolio is a personal portfolio website built with Three.js and React Three Fiber. It presents an immersive 3D world where users explore animated, interactive objects representing sections like About Me, Contact Me, Music, Games, and Projects. HTML content is embedded directly onto the screens of 3D models, blending web interfaces with 3D visuals. The experience is enhanced with GSAP-powered camera animations and multilingual support for project descriptions.",
      es: "3DPortfolio es un sitio web de portafolio personal creado con Three.js y React Three Fiber. Presenta un mundo 3D inmersivo donde los usuarios exploran objetos animados e interactivos que representan secciones como Sobre Mí, Contáctame, Música, Juegos y Proyectos. El contenido HTML está incrustado directamente en las pantallas de modelos 3D, fusionando interfaces web con visuales tridimensionales. La experiencia se enriquece con animaciones de cámara impulsadas por GSAP y soporte multilingüe para las descripciones de proyectos.",
    },
    features: {
      en: [
        "Immersive 3D Experience: Navigate a 3D scene with animated objects tied to portfolio sections.",
        "Screen-Embedded Content: HTML pages are embedded on the screens of 3D models.",
        "Interactive Hover Effects: Objects react to user interaction for a dynamic feel.",
        "GSAP Camera Animations: Smooth transitions between sections with GSAP.",
        "Multilanguage Support: Projects support multiple languages for wider accessibility.",
      ],
      es: [
        "Experiencia 3D Inmersiva: Navega una escena 3D con objetos animados vinculados a secciones del portafolio.",
        "Contenido Incrustado en Pantallas: Las páginas HTML están incrustadas en las pantallas de modelos 3D.",
        "Efectos Interactivos al Pasar el Ratón: Los objetos reaccionan a la interacción del usuario.",
        "Animaciones de Cámara con GSAP: Transiciones suaves entre secciones usando GSAP.",
        "Soporte Multilingüe: Los proyectos admiten varios idiomas para mayor accesibilidad.",
      ],
    },
    date: {
      en: "August 2025",
      es: "Agosto de 2025",
    },
    github: "https://github.com/ItO210/3d-portfolio", // Replace if different
  },
  {
    title: "HealthSync",
    can: "/images/a.png",
    images: [
      { src: "/images/a.png", alt: "First image" },
      { src: "/images/profile.jpeg", alt: "Second image" },
      { src: "/images/a.png", alt: "Third image" },
      { src: "/images/profile.jpeg", alt: "Fourth image" },
      { src: "/images/a.png", alt: "Fifth image" },
    ],
    description: {
      en: "HealthSync is a hospital equipment ticket system where staff report issues via web, and technicians and admins handle tickets through an Android app—managing repairs, uploading evidence, tracking performance, and managing accounts.",
      es: "HealthSync es un sistema de tickets para equipos hospitalarios donde el personal reporta problemas mediante la web, y los técnicos y administradores gestionan los tickets a través de una app Android—realizando reparaciones, subiendo evidencias, rastreando el rendimiento y administrando cuentas.",
    },
    features: {
      en: [
        "Web Ticket Form: Staff report equipment issues online.",
        "Technician App: Android app for viewing and managing tickets, with evidence uploads.",
        "Ticket States: Not Started, In Progress, Resolved, Not Resolved, Deleted.",
        "Admin Controls: Manage users and view performance stats.",
        "Image Upload: Required for unresolved or deleted tickets.",
      ],
      es: [
        "Formulario web de tickets: El personal reporta problemas de equipos en línea.",
        "App para técnicos: Aplicación Android para ver y gestionar tickets, con carga de evidencias.",
        "Estados del ticket: No iniciado, En progreso, Resuelto, No resuelto, Eliminado.",
        "Controles de administrador: Gestiona usuarios y visualiza estadísticas de rendimiento.",
        "Carga de imágenes: Requerida para tickets no resueltos o eliminados.",
      ],
    },
    date: {
      en: "September 2024",
      es: "Septiembre 2024",
    },
    github: "https://github.com/ItO210/equipment-ticket-system",
  },

  {
    title: "AIRacingLine",
    can: "/images/a.png",
    images: [
      { src: "/images/a.png", alt: "First image" },
      { src: "/images/profile.jpeg", alt: "Second image" },
    ],
    description: {
      en: "AIRacingLine is an AI-powered system for Unity that generates dynamic racing lines and provides real-time speed feedback. An ML-Agents-trained agent drives the optimal path, which is recorded and visualized with color changes (green, yellow, red) to guide players through acceleration and braking zones.",
      es: "AIRacingLine es un sistema impulsado por IA para Unity que genera líneas de carrera dinámicas y proporciona retroalimentación de velocidad en tiempo real. Un agente entrenado con ML-Agents conduce el camino óptimo, que se graba y visualiza con cambios de color (verde, amarillo, rojo) para guiar a los jugadores en zonas de aceleración y frenado.",
    },
    features: {
      en: [
        "AI Agent Training: Uses reward shaping and sensor tuning for optimal driving.",
        "Racing Line Generation: Creates the line from agent driving data.",
        "Dynamic Color Feedback: Updates line color in real time based on player speed.",
      ],
      es: [
        "Entrenamiento del Agente IA: Usa modelado de recompensas y ajuste de sensores para una conducción óptima.",
        "Generación de Línea de Carrera: Crea la línea a partir de los datos de conducción del agente.",
        "Retroalimentación de Color Dinámica: Cambia el color de la línea en tiempo real según la velocidad del jugador.",
      ],
    },
    date: {
      en: "September 2024",
      es: "Septiembre de 2024",
    },
    github: "https://github.com/ItO210/ai-racing-line",
  },

  {
    title: "CodeCuisine",
    can: "/images/a.png",
    images: [
      {
        src: "/images/projectImages/CodeCuisine/CodeCuisine1.png",
        alt: "Image1",
      },
      {
        src: "/images/projectImages/CodeCuisine/CodeCuisine2.gif",
        alt: "Image2",
      },
      {
        src: "/images/projectImages/CodeCuisine/CodeCuisine3.png",
        alt: "Image3",
      },
      {
        src: "/images/projectImages/CodeCuisine/CodeCuisine4.png",
        alt: "Image4",
      },
      {
        src: "/images/projectImages/CodeCuisine/CodeCuisine5.png",
        alt: "Image5",
      },
    ],
    description: {
      en: "CodeCuisine is an educational game that teaches kids programming by guiding them through a hamburger-making challenge. Players use a drag-and-drop interface with logic blocks like loops and actions to build recipes. The system checks their logic and gives instant feedback.",
      es: "CodeCuisine es un juego educativo que enseña programación a los niños guiándolos a través de un desafío para hacer hamburguesas. Los jugadores usan una interfaz de arrastrar y soltar con bloques lógicos como bucles y acciones para construir recetas. El sistema revisa su lógica y da retroalimentación instantánea.",
    },
    features: {
      en: [
        "Interactive Learning: Teaches programming fundamentals through play.",
        "Drag-and-Drop Programming: Players build recipes with logic blocks.",
        "Immediate Feedback: Provides instant checks on recipe logic.",
        "User Progress Tracking: Monitors levels, time, scores, and rankings.",
        "Admin Dashboard: Tracks players, engagement, and activity stats.",
      ],
      es: [
        "Aprendizaje Interactivo: Enseña los fundamentos de la programación a través del juego.",
        "Programación con Arrastrar y Soltar: Los jugadores construyen recetas con bloques lógicos.",
        "Retroalimentación Instantánea: Revisa al momento la lógica de las recetas.",
        "Seguimiento del Progreso del Usuario: Monitorea niveles, tiempo, puntuaciones y clasificaciones.",
        "Panel de Administración: Supervisa jugadores, participación y estadísticas de actividad.",
      ],
    },
    date: {
      en: "March 2024",
      es: "Marzo de 2024",
    },
    github: "https://github.com/ItO210/educational-coding-game",
  },

  {
    title: "AireSano",
    can: "/images/a.png",
    images: [{ src: "/images/a.png", alt: "First image" }],
    description: {
      en: "This project is an IoT-based Air Quality Monitoring System that uses an ESP32 microcontroller to collect environmental data (temperature, humidity, and air quality) from sensors. The data is sent to a REST API, stored in a MySQL database, and visualized on a web-based dashboard.",
      es: "Este proyecto es un sistema de monitoreo de calidad del aire basado en IoT que utiliza un microcontrolador ESP32 para recopilar datos ambientales (temperatura, humedad y calidad del aire) desde sensores. Los datos se envían a una API REST, se almacenan en una base de datos MySQL y se visualizan en un panel web.",
    },
    features: {
      en: [
        "Real-time Sensor Data Collection: The ESP32 reads temperature, humidity, and air quality values from connected sensors.",
        "Wi-Fi Data Transmission: The ESP32 sends sensor data to a REST API for storage and processing.",
        "REST API & Database Integration: A backend Node.js API records incoming sensor data in a MySQL database for historical tracking.",
        "Web-Based Dashboard: A frontend interface allows users to view real-time and historical data in a graphical format.",
        "Data Visualization: Users can analyze environmental trends using charts and tables.",
      ],
      es: [
        "Recolección de Datos en Tiempo Real: El ESP32 lee valores de temperatura, humedad y calidad del aire desde sensores conectados.",
        "Transmisión de Datos por Wi-Fi: El ESP32 envía los datos de los sensores a una API REST para su almacenamiento y procesamiento.",
        "Integración con API REST y Base de Datos: Una API backend en Node.js registra los datos entrantes en una base de datos MySQL para seguimiento histórico.",
        "Panel Web: Una interfaz frontend permite a los usuarios ver datos en tiempo real e históricos en formato gráfico.",
        "Visualización de Datos: Los usuarios pueden analizar tendencias ambientales mediante gráficos y tablas.",
      ],
    },
    date: {
      en: "September 2023",
      es: "Septiembre de 2023",
    },
    github: "https://github.com/ItO210/air-monitoring-system/tree/main",
  },
];
