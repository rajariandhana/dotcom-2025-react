import { useEffect, useState } from "react";
export default function Work(){
    const [employers, setEmployers] = useState([]);
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        Promise.all([
          fetch("/src/assets/employers.json").then(res => res.json()),
          fetch("/src/assets/positions.json").then(res => res.json())
        ])
          .then(([employersData, positionsData]) => {
            setEmployers(employersData);
            setPositions(positionsData);
          })
          .catch(error => console.error("Failed to load data:", error));
      }, []);

      const groupedPositions = positions.reduce((acc, position) => {
        const { employer_slug } = position;
        if (!acc[employer_slug]) {
          acc[employer_slug] = [];
        }
        acc[employer_slug].push(position);
        return acc;
      }, {});
    

    return(
        <section>
            <h2 className="text-2xl mb-2 cursor-pointer">
                💼 Experience
            </h2>
            <div>
                {employers.map((employer) => (
                    <div  key={employer.slug}  className="mb-8">
                        <div className="p-4 mb-4 w-fit bg-white shadow-md rounded-xl flex items-center gap-4">
                            <img src={`/src/assets/logo/${employer.slug}.png`}
                            alt={"/src/assets/logo/" + employer.slug + "-logo.jpeg"}
                            className="h-12 rounded-md"
                            />
                            <a href={employer.link } target="_blank" className="flex items-center justify-start gap-2 w-fit text-lg hover:underline">
                                <h2>
                                    {employer.name }
                                </h2>
                            </a>

                        </div>

                        <ol className="relative ml-6 border-indigo-300 border-s ">
                        {groupedPositions[employer.slug] ? (
                            groupedPositions[employer.slug].map((position, idx) => (
                            <li key={idx} className="mb-6 ms-4">
                                <div
                                    className="absolute w-3 h-3 bg-indigo-500 rounded-full mt-1.5 -start-1.5 border border-indigo-500 ">
                                </div>
                                <time
                                    className="mb-1 text-xs font-normal leading-none text-gray-500 ">{position.date }</time>
                                <h3 className="font-semibold text-gray-900 text-md font-montserrat">{position.name }</h3>
                                <p className="mb-2 mr-12 text-sm font-normal text-gray-500">{position.description }</p>
                                <div className="flex flex-wrap gap-1">
                                    {/* @foreach (explode('|', $position.skills) as $skill)
                                        <span
                                            className="px-4 py-2 text-xs text-white rounded-lg bg-indigo-950">{skill }}</span>
                                    @endforeach */}
                                    {position.skills && (
                                        <SkillTags skillsString={position.skills} />
                                    )}
                                </div>
                            </li>
                            ))
                        ) : (
                            <span></span>
                        )}
                        </ol>
                    </div>
                ))}
            </div>

        </section>
    )
}

function SkillList({ skillsString }) {
    const skills = skillsString.split("|");
  
    return (
      <ul className="list-disc pl-5">
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    );
  }
  

  function SkillTags({ skillsString }) {
    const skills = skillsString.split("|");
  
    return (
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 text-xs text-white rounded-lg bg-indigo-900"
          >
            {skill}
          </span>
        ))}
      </div>
    );
  }
  