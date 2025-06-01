import { Link } from "react-router-dom";

export default function ProjectCard({project}){
    return (
        <Link
            to={`/projects`}
            className="base w-fit gap-y-2
            hover:-rotate-3 group hover:scale-105 transition-all ease-out duration-300 z-10 cursor-pointer p-2"
        >
            <img
                src={`/src/assets/projects/${project.slug}/1.${project.extension}`}
                alt={project.name} 
                className="h-32 w-60 object-cover rounded-md"/>
            <span className="font-bold truncate w-60 h-6 text-center">{project.name}</span>
        </Link>
    )
}