import { useEffect, useState } from "react"
import ProjectCard from "../Projects/ProjectCard"
import { div } from "framer-motion/client"

// import Hero from "./Hero"
export default function Home(){
    return (
        <main>
            <Hero></Hero>
            <BestProjects></BestProjects>
            <BestShots></BestShots>
        </main>
    )
}

const Hero=()=>{
    return (
        <div className="w-full motion-preset-slide-down">
            <div className="flex">
                <img src="src/assets/ProfilePicture.jpg" alt=""
                className="size-32 rounded-full object-cover bg-indigo-rose p-1 mb-12" />
            </div>
            <h1 className="font-mono font-bold">
                🌎 <span className="text-indigo-rose">Hello, world!</span>
            </h1>
            <p className="text-justify">
            You'll find several of my best works such as my projects as a developer, my interest in photography, and anything else since this is my website and I can do anything I want here.
            </p>
            <span className="text-sm text-gray-600">
                Feel free to hit me up in any of my social media
            </span>
        </div>
    )
}

function BestProjects(){
    const [projects,setProjects]=useState([]);
    const slugs=["boombatag-2024", "box-of-curiosity", "minesweeper"];
    useEffect(()=>{
        fetch("/src/assets/projects.json")
            .then((res) => res.json())
            .then((data) => {
                const filtered = data.filter((project) =>
                    slugs.includes(project.slug)
                  );
                  setProjects(filtered)
            })
            .catch((err) => console.error("Error fetching projects:", err));
    }, []);
    return (
        <div className=" motion-preset-slide-down ">
            <h2 className="text-2xl mb-2 cursor-pointer">
                🚀 Best Projects
            </h2>
            <div className="w-fit grid grid-cols-1 md:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </div>
    )
}

function BestShots(){
    const bestShots = [
        "/src/assets/gallery/IMG_9509.JPG",
        "/src/assets/gallery/IMG_9525.JPG",
        "/src/assets/gallery/IMG_9652.JPG"
    ]
    return (
        <div className=" motion-preset-slide-down">
            <h2 className="text-2xl font-bold mb-2 cursor-pointer">
                📸 Best Shots
            </h2>
            <div className="grid grid-cols-3 gap-4">
                {bestShots.map((shots)=>(
                    <div className="funny-rotate z-10 cursor-pointer shadow-md">
                        <img className="w-64 p-1 bg-white"
                         src={shots} alt={shots} />
                    </div>
                ))}
            </div>
        </div>
    )
}