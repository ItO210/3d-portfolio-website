// src/projectsData.js

export const projects = [
  {
    title: "HealthSync",
    can: "/images/a.png",
    images: ["/images/a.png"],
    description:
      "HealthSync is a hospital equipment ticket system where staff report issues via web, and technicians and admins handle tickets through an Android app—managing repairs, uploading evidence, tracking performance, and managing accounts.",
    features: [
      "Web Ticket Form: Staff report equipment issues online.",
      "Technician App: Android app for viewing and managing tickets, with evidence uploads.",
      "Ticket States: Not Started, In Progress, Resolved, Not Resolved, Deleted.",
      "Admin Controls: Manage users and view performance stats.",
      "Image Upload: Required for unresolved or deleted tickets.",
    ],
    date: "September 2024",
    github: "https://github.com/ItO210/equipment-ticket-system",
  },
  {
    title: "AIRacingLine",
    can: "/images/a.png",
    images: ["/images/a.png"],
    description:
      "AIRacingLine is an AI-powered system for Unity that generates dynamic racing lines and provides real-time speed feedback. An ML-Agents-trained agent drives the optimal path, which is recorded and visualized with color changes (green, yellow, red) to guide players through acceleration and braking zones.",
    features: [
      "AI Agent Training: Uses reward shaping and sensor tuning for optimal driving.",
      "Racing Line Generation: Creates the line from agent driving data.",
      "Dynamic Color Feedback: Updates line color in real time based on player speed.",
    ],
    date: "September 2024",
    github: "https://github.com/ItO210/ai-racing-line",
  },
  {
    title: "CodeCuisine",
    can: "/images/a.png",
    images: ["/images/a.png"],

    description:
      "CodeCuisine is an educational game that teaches kids programming by guiding them through a hamburger-making challenge. Players use a drag-and-drop interface with logic blocks like loops and actions to build recipes. The system checks their logic and gives instant feedback.",

    features: [
      "Interactive Learning: Teaches programming fundamentals through play.",
      "Drag-and-Drop Programming: Players build recipes with logic blocks.",
      "Immediate Feedback: Provides instant checks on recipe logic.",
      "User Progress Tracking: Monitors levels, time, scores, and rankings.",
      "Admin Dashboard: Tracks players, engagement, and activity stats.",
    ],
    date: "March 2024",
    github: "https://github.com/ItO210/educational-coding-game",
  },
  {
    title: "AireSano",
    can: "/images/a.png",
    images: ["/images/a.png"],

    description:
      "This project is an IoT-based Air Quality Monitoring System that uses an ESP32 microcontroller to collect environmental data (temperature, humidity, and air quality) from sensors. The data is sent to a REST API, stored in a MySQL database, and visualized on a web-based dashboard.",

    features: [
      "Real-time Sensor Data Collection: The ESP32 reads temperature, humidity, and air quality values from connected sensors.",
      "Wi-Fi Data Transmission: The ESP32 sends sensor data to a REST API for storage and processing.",
      "REST API & Database Integration: A backend Node.js API records incoming sensor data in a MySQL database for historical tracking.",
      "Web-Based Dashboard: A frontend interface allows users to view real-time and historical data in a graphical format.",
      "Data Visualization: Users can analyze environmental trends using charts and tables.",
    ],
    date: "September 2023",
    github: "https://github.com/ItO210/air-monitoring-system/tree/main",
  },
];
