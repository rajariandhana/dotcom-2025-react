import { useEffect, useState } from "react";
import { SwipeCarousel } from "./SwipeCarousel";
export default function ProjectModal({ project, onClose }) {
    const [imgs, setImgs] = useState<string[]>([]);

    useEffect(() => {
    if (!project) return;

    const prefix = `/src/assets/projects/${project.slug}/`;
    const paths = Array.from({ length: project.numPhoto }, (_, i) => 
        `${prefix}${i + 1}.${project.extension}`
    );

    setImgs(paths);
    }, [project]);


  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      onClick={onClose} // clicking the background closes modal
      className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-50 flex items-center justify-center motion-preset-fade"
    >
      <div
        onClick={(e) => e.stopPropagation()} // prevent modal from closing when clicking inside it
        className="base rounded max-w-88 md:max-w-2xl !py-2 md:!py-4 shadow-lg !items-start motion-preset-slide-down"
      >
        {/* <img
          src={`/src/assets/projects/${project.slug}/1.${project.extension}`}
          className="w-full h-auto rounded-lg mb-2"
          alt={project.name}
        /> */}
        <SwipeCarousel 
          imgs={imgs}>
            
        </SwipeCarousel>
        <div className="px-4">
          <h2 className="text-xl font-bold mt-2">{project.name}</h2>
          <p className="tex-lg mb-2">{project.description}</p>
          <ul className="flex gap-x-1">
              {project.techs.map((tech) => (
                  <li
                  key={tech}
                  className="bg-indigo-900 text-white text-sm px-2 py-1 rounded-md"
                  >
                  {tech}
                  </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
