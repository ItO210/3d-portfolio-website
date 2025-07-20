import { useState } from "react";
import { projects } from "./projectsData";
import { BsGithub } from "react-icons/bs";

const ITEMS_PER_PAGE = 9;

export default function ProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = projects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  if (selectedProject) {
    // Fullscreen view

    return (
      <div className="w-full h-full text-3xl font-mono bg-neutral-200 p-8 flex flex-col items-center justify-between gap-8">
        <div className="flex items-center justify-center overflow-hidden rounded-2xl border shadow-lg border-white shadow-neutral-500 w-full h-full">
          {selectedProject.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={selectedProject.title}
              className="w-full h-full object-contain "
            />
          ))}
        </div>
        <div className="text-center w-full flex flex-col gap-2">
          <h1 className="text-4xl font-bold ">{selectedProject.title}</h1>
          <h2 className="text-xl font-extralight">{selectedProject.date}</h2>
        </div>

        <p className="">{selectedProject.description}</p>

        <ul className="list-disc pl-6 text-2xl">
          {selectedProject.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        <div className="flex justify-between items-center w-full gap-6">
          <button
            onClick={() => setSelectedProject(null)}
            className="w-full font-mono flex gap-4 items-center justify-center p-4 rounded-2xl shadow-md shadow-neutral-500 hover:scale-105 transition-transform"
          >
            Exit
          </button>
          <button
            onClick={() => setSelectedProject(null)}
            className="w-full font-mono flex gap-4 items-center justify-center p-4 rounded-2xl shadow-md shadow-neutral-500 hover:scale-105 transition-transform"
          >
            Back to Projects
          </button>

          <a
            href={selectedProject.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full font-mono flex gap-4 items-center justify-center p-4 rounded-2xl shadow-md shadow-neutral-500 hover:scale-105 transition-transform"
          >
            <BsGithub />
            Github
          </a>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="w-full h-full text-3xl font-mono bg-neutral-200 p-8 flex flex-col items-center gap-6">
      <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-4">
        {currentProjects.map((project, index) => (
          <div
            key={index}
            onClick={() => setSelectedProject(project)}
            className="flex flex-col items-center justify-center text-center shadow-lg bg-neutral-100 border border-white shadow-neutral-500 rounded-2xl cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              src={project.can}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="p-2">{project.title}</div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex gap-4 mt-4 text-2xl">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-xl shadow-md ${
            currentPage === 1
              ? "bg-neutral-400 cursor-not-allowed"
              : "bg-neutral-100 hover:bg-neutral-300"
          }`}
        >
          Prev
        </button>

        <span className="flex items-center">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-xl shadow-md ${
            currentPage === totalPages
              ? "bg-neutral-400 cursor-not-allowed"
              : "bg-neutral-100 hover:bg-neutral-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
