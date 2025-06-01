import { useEffect, useState } from "react";
export default function Educaation(){
    const [educations,setEducations]=useState([]);
    useEffect(()=>{
        fetch("/src/assets/education2.json")
            .then((res) => res.json())
            .then((data) => {setEducations(data)})
            .catch((err) => console.error("Error fetching projects:", err));
    }, []);
    
    return (
        <section>
            <h2 className="text-2xl mb-2 cursor-pointer">
                🎓 Where I study
            </h2>
            <ul>
                {educations.map((education)=>(
                    
                    <li className="flex gap-x-4 items-center p-4 rounded-xl shadow-md bg-white mb-4">
                        <img src={`/src/assets/logo/${education.slug}.png`}
                        alt={"/src/assets/logo/" + education.slug + "-logo.jpeg"}
                        className="h-20 rounded-md"
                        />
                        <div>
                            <a href={education.link} target="_blank" className="hover:underline">
                                <h3 className="text-lg font-semibold -mb-2">{ education.name }</h3>
                            </a>

                                <span className="text-sm text-gray-500 -mb-2">{ education.start } - { education.end }</span>
                                <p>{ education.description }</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}