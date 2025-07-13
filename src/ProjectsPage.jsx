import { useState } from "react";
import { projects } from "./projectsData";

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
      <div className="w-full h-full text-3xl font-mono bg-neutral-200 p-6 flex flex-col items-center gap-6">
        <img
          src={selectedProject.image}
          alt={selectedProject.title}
          className="w-full h-full bg-neutral-100 border shadow-lg border-white shadow-neutral-500 rounded-2xl object-cover"
        />
        <h1 className="text-4xl font-bold">{selectedProject.title}</h1>
        <button
          onClick={() => setSelectedProject(null)}
          className="px-6 py-3 bg-neutral-300 rounded-xl shadow-md hover:scale-105 transition-transform "
        >
          Back to Projects
        </button>
      </div>
    );
  }

  // Grid view
  return (
    <div className="w-full h-full text-3xl font-mono bg-neutral-200 p-6 flex flex-col items-center gap-6">
      <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-4">
        {currentProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="flex flex-col items-center justify-center text-center shadow-lg bg-neutral-100 border border-white shadow-neutral-500 rounded-2xl cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              src={project.image}
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
