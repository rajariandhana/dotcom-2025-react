import { useEffect, useState } from "react";
import { SwipeCarousel } from "./SwipeCarousel";

import type { Project } from "../../types"

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imgs, setImgs] = useState<string[]>([]);

  useEffect(() => {
    if (!project) return;

    // Create the list of image paths based on the project data
    const prefix = `/src/assets/projects/${project.slug}/`;
    const paths = Array.from({ length: project.numPhoto }, (_, i) =>
      `${prefix}${i + 1}.${project.extension}`
    );

    setImgs(paths);
  }, [project]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!project) {
    return null; // Optionally, render a loading spinner or placeholder here
  }

  return (
    <div
      onClick={onClose} // clicking the background closes modal
      className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-50 flex items-center justify-center motion-preset-fade"
    >
      <div
        onClick={(e) => e.stopPropagation()} // prevent modal from closing when clicking inside it
        className="base rounded max-w-88 md:max-w-2xl !py-2 md:!py-4 shadow-lg !items-start motion-preset-slide-down"
      >
        {imgs.length > 0 ? (
          <SwipeCarousel imgs={imgs} />
        ) : (
          <div className="text-center text-gray-400">No images available</div>
        )}
        <div className="px-4">
          <h2 className="text-xl font-bold mt-2">{project.name}</h2>
          <p className="tex-lg mb-2">{project.description}</p>
          <ul className="flex gap-x-1 mb-2">
            {project.techs.map((tech) => (
              <li
                key={tech}
                className="bg-indigo-900 text-white text-sm px-2 py-1 rounded-md"
              >
                {tech}
              </li>
            ))}
          </ul>
          {project.demo ? (
            <a href={project.demo} target="_blank"
            className="bg-rose-500 text-white text-sm px-2 py-1 rounded-md hover:bg-rose-600 transition-all ease-in-out transition-300s">Try here</a>
          ):(
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
