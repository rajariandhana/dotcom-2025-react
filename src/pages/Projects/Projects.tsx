import { useEffect, useState } from "react";
import ProjectCard, { ProjectCardSkeleton } from "../Projects/ProjectCard";
import ProjectModal from "./ProjectModal";

import type { Project } from "../../types";

type CategoryKey =
  | "🎮 Game Development"
  | "🌐 Web Development"
  | "💡 Other Projects";

const categoryMap: Record<CategoryKey, (project: Project) => boolean> = {
  "🎮 Game Development": (project) => project.category === "game",
  "🌐 Web Development": (project) => project.category === "web",
  "💡 Other Projects": (project) => !["game", "web"].includes(project.category),
};

export default function Projects() {
  const [projectsByCategory, setProjectsByCategory] = useState<
    Record<CategoryKey, Project[]>
  >({
    "🎮 Game Development": [],
    "🌐 Web Development": [],
    "💡 Other Projects": [],
  });
  const [modal, setModal] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/src/assets/projects.json")
      .then((res) => res.json())
      .then((data) => {
        const categorizedProjects: Record<CategoryKey, Project[]> = {
          "🎮 Game Development": data.filter(
            categoryMap["🎮 Game Development"]
          ),
          "🌐 Web Development": data.filter(categoryMap["🌐 Web Development"]),
          "💡 Other Projects": data.filter(categoryMap["💡 Other Projects"]),
        };
        setProjectsByCategory(categorizedProjects);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="">
      {loading ? (
        <ul className="w-fit grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
          <ProjectCardSkeleton></ProjectCardSkeleton>
          <ProjectCardSkeleton></ProjectCardSkeleton>
          <ProjectCardSkeleton></ProjectCardSkeleton>
          <ProjectCardSkeleton></ProjectCardSkeleton>
          <ProjectCardSkeleton></ProjectCardSkeleton>
          <ProjectCardSkeleton></ProjectCardSkeleton>
        </ul>
      ) : (
        <>
          {modal && (
            <ProjectModal project={modal} onClose={() => setModal(null)} />
          )}
          {Object.entries(projectsByCategory).map(([title, projectList]) => (
            <section key={title}>
              <h2 className="text-xl font-bold mb-2 cursor-pointer">
                {title}
              </h2>
              <ul className="w-fit grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                {projectList.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    onClick={() => setModal(project)}
                  />
                ))}
              </ul>
            </section>
          ))}
        </>
      )}
    </main>
  );
}
