import { useEffect, useState } from "react";
import ProjectCard from "../Projects/ProjectCard"
export default function(){
    const [projects,setProjects]=useState([]);
    const [games,setGames]=useState([]);
    const [webs,setWebs]=useState([]);
    const [others,setOthers]=useState([]);
    const slugs=["boombatag-2024", "box-of-curiosity", "minesweeper"];
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
        <main className="!max-w-4xl">
            <div className=" motion-preset-slide-down">
                <h2 className="text-xl font-bold mb-2 cursor-pointer">
                    🎮  Game Development
                </h2>
                <ul className="w-fit grid grid-cols-1 md:grid-cols-3 gap-4">
                    {games.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </ul>
            </div>
            <div className=" motion-preset-slide-down">
                <h2 className="text-xl font-bold mb-2 cursor-pointer">
                    🎮  Web Development
                </h2>
                <ul className="w-fit grid grid-cols-1 md:grid-cols-3 gap-4">
                    {webs.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </ul>
            </div>
            <div className=" motion-preset-slide-down">
                <h2 className="text-xl font-bold mb-2 cursor-pointer">
                    ✨  Other projects
                </h2>
                <ul className="w-fit grid grid-cols-1 md:grid-cols-3 gap-4">
                    {others.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </ul>
            </div>
        </main>
    )
}