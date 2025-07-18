import { useEffect, useState } from "react";
import ProjectCard, { ProjectCardSkeleton } from "../Projects/ProjectCard";
import ProjectModal from "../Projects/ProjectModal";

import type { Project } from "../../types";

export default function Home() {
  const [modal, setModal] = useState<Project | null>(null);

  return (
    <main>
      <Hero></Hero>
      <BestProjects onOpen={setModal} />
      <BestShots />
      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </main>
  );
}

const Hero = () => {
  return (
    <section>
      <div className="flex">
        <img
          src="src/assets/ProfilePicture.jpg"
          alt=""
          className="size-32 rounded-full object-cover bg-indigo-rose p-1 mb-12"
        />
      </div>
      <h1 className="font-mono font-bold">
        🌎{" "}
        <span className="text-indigo-rose motion-preset-pop ">
          Hello, world!
        </span>
      </h1>
      <p className="text-justify">
        You'll find several of my best works such as my projects as a developer,
        my interest in photography, and anything else since this is my website
        and I can do anything I want here.
      </p>
      <span className="text-sm text-gray-600">
        Feel free to hit me up in any of my social media
      </span>
      <ul className="flex items-center w-fit gap-2">
        <li>
          <a href="https://instagram.com/rajariandhana" target="_blank">
            <svg
              className="size-8 text-gray-800 funny-rotate"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </li>
        <li>
          <a href="https://github.com/rajariandhana" target="_blank">
            <svg
              className="size-8 text-gray-800 funny-rotate"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </li>
        <li>
          <a href="https://linkedin.com/in/rajariandhana" target="_blank">
            <svg
              className="size-8 text-gray-800 funny-rotate"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                clip-rule="evenodd"
              />
              <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
            </svg>
          </a>
        </li>
      </ul>
    </section>
  );
};

// Best Projects Section
interface BestProjectsProps {
  onOpen: (project: Project) => void;
}

function BestProjects({ onOpen }: BestProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const slugs = ["boombatag-2024", "box-of-curiosity", "studykanji"];

  useEffect(() => {
    fetch("/src/assets/projects.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((project: { slug: string }) =>
          slugs.includes(project.slug)
        );
        setProjects(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="">
      <h2 className="text-2xl mb-2 cursor-pointer">🚀 Favorite Projects</h2>
      {loading ? (
        <div className="w-fit grid grid-cols-1 md:grid-cols-3 gap-2">
          <ProjectCardSkeleton></ProjectCardSkeleton>
          <ProjectCardSkeleton></ProjectCardSkeleton>
          <ProjectCardSkeleton></ProjectCardSkeleton>
        </div>
      ) : (
        <div className="w-fit grid grid-cols-1 md:grid-cols-3 gap-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onClick={() => onOpen(project)} // call onOpen passed from parent
            />
          ))}
        </div>
      )}
    </section>
  );
}
function BestShots() {
  const bestShots = [
    "/src/assets/gallery/IMG_9509.JPG",
    "/src/assets/gallery/IMG_9525.JPG",
    "/src/assets/gallery/IMG_9652.JPG",
  ];
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-2 cursor-pointer">📸 Best Shots</h2>
      <div className="w-fit grid grid-cols-1 md:grid-cols-3 gap-4">
        {bestShots.map((shots) => (
          <img className="w-64 funny-rotate" src={shots} alt={shots} />
        ))}
      </div>
    </section>
  );
}
