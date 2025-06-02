import { useEffect, useState } from "react";
import ProjectCard from "../Projects/ProjectCard"
import ProjectModal from "./ProjectModal";

import type { Project } from "../../types";

export default function Projects(){
    const [projects, setProjects] = useState<Project[]>([]);
    const [games,setGames]=useState<Project[]>([]);
    const [webs,setWebs]=useState<Project[]>([]);
    const [others,setOthers]=useState<Project[]>([]);
    const [modal, setModal] = useState<Project | null>(null);
    useEffect(()=>{
        fetch("/src/assets/projects.json")
            .then((res) => res.json())
            .then((data) => {setProjects(data)})
            .catch((err) => console.error("Error fetching projects:", err));
    }, []);
    useEffect(() => {
        const gamesFiltered = projects.filter(
          (project) => project.category === "game"
        );
        const websFiltered = projects.filter(
          (project) => project.category === "web"
        );
        const othersFiltered = projects.filter(
          (project) => !["game", "web"].includes(project.category)
        );
    
        setGames(gamesFiltered);
        setWebs(websFiltered);
        setOthers(othersFiltered);
      }, [projects]);
    
    return (
        /**
         * tambah:
         * - wasteless
         * - rajawali
         * - siputih?
         * - not space invader
         * 
         */
        <main className="">
            {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
            <section>
                <h2 className="text-xl font-bold mb-2 cursor-pointer">
                    🎮  Game Development
                </h2>
                <ul className="w-fit grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                    {games.map((project) => (
                        <ProjectCard
                        key={project.slug}
                        project={project} 
                        onClick={()=>setModal(project)}
                        />
                    ))}
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-bold mb-2 cursor-pointer">
                    🌐  Web Development
                </h2>
                <ul className="w-fit grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                    {webs.map((project) => (
                        <ProjectCard
                        key={project.slug}
                        project={project} 
                        onClick={()=>setModal(project)}
                        />
                    ))}
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-bold mb-2 cursor-pointer">
                    💡  Other projects
                </h2>
                <ul className="w-fit grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                    {others.map((project) => (
                        <ProjectCard
                        key={project.slug}
                        project={project} 
                        onClick={()=>setModal(project)}
                        />
                    ))}
                </ul>
            </section>
        </main>
    )
}