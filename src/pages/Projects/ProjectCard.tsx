import type { Project } from "../../types";
import { type MouseEventHandler } from "react";

interface Props {
  project: Project;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export default function ProjectCard({ project, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="relative base w-fit gap-y-2 hover:-rotate-3 group hover:scale-105 transition-all ease-out duration-300 z-10 cursor-pointer p-2"
    >
      <img
        src={`/src/assets/projects/${project.slug}/1.${project.extension}`}
        alt={project.name}
        className="h-32 w-56 object-cover rounded-md transition-opacity duration-500"
      />
      <span className="font-bold truncate w-56 h-6 text-center mt-2 block">
        {project.name}
      </span>
    </div>
  );
}

export const ProjectCardSkeleton = () => {
  return (
    <div className="relative base w-fit gap-y-2 hover:-rotate-3 group hover:scale-105 transition-all ease-out duration-300 z-10 cursor-pointer p-2">
      <div className="w-fit flex flex-col justify-center items-center">
        <div className="h-32 w-56 skeleton" />
        <span className="font-bold truncate w-40 h-6 text-center mt-2 block skeleton" />
      </div>
    </div>
  );
};
