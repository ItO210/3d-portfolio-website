import AboutMe from "../components/pages/AboutMe";
import ProjectsPage from "../components/pages/ProjectsPage";
import GamesPage from "../components/pages/GamesPage";
import MusicPage from "../components/pages/MusicPage";
import ContactPage from "../components/pages/ContactPage";

export const navConfig = {
  AboutMe: {
    glass: "AboutMe_Glass_Target",
    text: "AboutMe_Red_Text_Target",
    target: "Phone_Screen_White_Target",
    cameraOffset: [-1.5, 0, 0],
    htmlRotation: [0, -Math.PI / 2, 0],
    htmlSizeAxis: ["z", "x"],
    htmlOffset: [-0.001, 0, 0],
    component: AboutMe,
  },
  Projects: {
    glass: "Projects_Glass_Target",
    text: "Projects_Red_Text_Target",
    target: "VendingMachine_Screen_White_Target",
    cameraOffset: [0, 0, 1],
    htmlRotation: [0, 0, 0],
    htmlSizeAxis: ["x", "y"],
    htmlOffset: [0, 0, 0.001],
    component: ProjectsPage,
  },
  Games: {
    glass: "Games_Glass_Target",
    text: "Games_Red_Text_Target",
    target: "ArcadeMachine_Screen_White_Target",
    cameraOffset: [0, 0, -1.2],
    htmlRotation: [0, Math.PI, 0],
    htmlSizeAxis: ["x", "y"],
    htmlOffset: [0, 0, -0.001],
    component: GamesPage,
  },
  Music: {
    glass: "Music_Glass_Target",
    text: "Music_Red_Text_Target",
    target: "Jackbox_Screen_White_Target",
    cameraOffset: [0, 0, -1.2],
    htmlRotation: [0, Math.PI, 0],
    htmlSizeAxis: ["x", "y"],
    htmlOffset: [0, 0, -0.001],
    component: MusicPage,
  },
  Contact: {
    glass: "Contact_Glass_Target",
    text: "Contact_Red_Text_Target",
    target: "Phone_Screen_White_Target",
    cameraOffset: [-1.5, 0, 0],
    htmlRotation: [0, Math.PI / 2, 0],
    htmlSizeAxis: ["z", "x"],
    htmlOffset: [-0.001, 0, 0],
    component: ContactPage,
  },
};
