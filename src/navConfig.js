import AboutMe from "./AboutMe";
import ProjectsPage from "./ProjectsPage";
import GamesPage from "./GamesPage";
import MusicPage from "./MusicPage";
import ContactPage from "./ContactPage";

export const navConfig = {
  AboutMe: {
    glass: "AboutMeGlass",
    text: "AboutMe_Red_Bloom",
    target: "PhoneFacePlateScreen_White",
    cameraOffset: [-1.5, 0, 0],
    htmlRotation: [0, -Math.PI / 2, 0],
    htmlSizeAxis: ["z", "x"],
    htmlOffset: [-0.001, 0, 0],
    component: AboutMe,
  },
  Projects: {
    glass: "ProjectsGlass",
    text: "Projects_Red_Bloom",
    target: "VendingMachineBodyScreen_White",
    cameraOffset: [0, 0, 1],
    htmlRotation: [0, 0, 0],
    htmlSizeAxis: ["x", "y"],
    htmlOffset: [0, 0, 0.001],
    component: ProjectsPage,
  },
  Games: {
    glass: "GamesGlass",
    text: "Games_Red_Bloom",
    target: "ArcadeMachineBodyScreen_White",
    cameraOffset: [0, 0, -1.2],
    htmlRotation: [0, Math.PI, 0],
    htmlSizeAxis: ["x", "y"],
    htmlOffset: [0, 0, -0.001],
    component: GamesPage,
  },
  Music: {
    glass: "MusicGlass",
    text: "Music_Red_Bloom",
    target: "JackboxBodyScreen_White",
    cameraOffset: [0, 0, -1.2],
    htmlRotation: [0, Math.PI, 0],
    htmlSizeAxis: ["x", "y"],
    htmlOffset: [0, 0, -0.001],
    component: MusicPage,
  },
  Contact: {
    glass: "ContactGlass",
    text: "Contact_Red_Bloom",
    target: "PhoneFacePlateScreen_White",
    cameraOffset: [-1.5, 0, 0],
    htmlRotation: [0, Math.PI / 2, 0],
    htmlSizeAxis: ["z", "x"],
    htmlOffset: [-0.001, 0, 0],
    component: ContactPage,
  },
};
