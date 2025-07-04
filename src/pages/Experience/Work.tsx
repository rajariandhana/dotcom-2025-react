import { useEffect, useState } from "react";

import type { Employer, Position } from "../../types";

export default function Work() {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/src/assets/employers.json").then((res) => res.json()),
      fetch("/src/assets/positions.json").then((res) => res.json()),
    ])
      .then(([employersData, positionsData]) => {
        setEmployers(employersData);
        setPositions(positionsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load data:", error);
        setLoading(false);
      });
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/src/assets/Resume 2025 June.pdf";
    link.download = "Resume_RalfazzaRajariandhana.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const groupedPositions = positions.reduce((acc, position) => {
    const { employer_slug } = position;
    if (!acc[employer_slug]) {
      acc[employer_slug] = [];
    }
    acc[employer_slug].push(position);
    return acc;
  }, {} as Record<string, Position[]>);

  return (
    <section className="w-full">
      <h2 className="text-2xl mb-2 cursor-pointer flex items-center gap-x-4">
        💼 What I've done
        <button
          onClick={handleDownload}
          className="flex items-center gap-x-2 text-sm bg-indigo-500 text-white px-4 py-2 rounded-lg cursor-pointer shadow-md hover:bg-indigo-600 transition-all"
        >
          Download My Resume
          <svg
            className="size-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
            />
          </svg>
        </button>
      </h2>
      {loading ? (
        <div className="w-full">
          <EmployerSkeleton></EmployerSkeleton>
          <EmployerSkeleton></EmployerSkeleton>
        </div>
      ) : (
        <div>
          {employers.map((employer) => {
            return (
              <div key={employer.slug} className="mb-8">
                <div className="p-4 mb-4 w-fit bg-white shadow-md rounded-xl flex items-center gap-4">
                  <img
                    src={`/src/assets/logo/${employer.slug}.png`}
                    alt={employer.name}
                    className="h-12 w-12 object-contain rounded-md"
                  />
                  <a
                    href={employer.link}
                    target="_blank"
                    className="flex items-center justify-start gap-2 w-fit text-lg hover:underline"
                  >
                    <h2>{employer.name}</h2>
                  </a>
                </div>

                <ol className="relative ml-6 border-indigo-300 border-s">
                  {groupedPositions[employer.slug]?.map((position, idx) => (
                    <li key={idx} className="mb-6 ms-4">
                      <div className="absolute w-3 h-3 bg-indigo-500 rounded-full mt-1.5 -start-1.5 border border-indigo-500" />
                      <time className="mb-1 text-xs font-normal leading-none text-gray-500">
                        {position.date}
                      </time>
                      <h3 className="font-semibold text-gray-900 text-md font-montserrat">
                        {position.name}
                      </h3>
                      <p className="mb-2 mr-12 text-sm font-normal text-gray-500">
                        {position.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {position.skills && (
                          <SkillTags skillsString={position.skills} />
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function SkillTags({ skillsString }: { skillsString: string }) {
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

const EmployerSkeleton = () => {
  return (
    <div className="w-full">
      <div className="p-4 mb-4 w-fit bg-white shadow-md rounded-xl flex items-center gap-4">
        <div className="h-12 w-12 object-contain skeleton" />
        <span className="flex items-center justify-start gap-2 w-56 h-4 text-lg skeleton" />
      </div>
      <ol className="w-full relative ml-6 border-indigo-300 border-s">
        <WorkPositionSkeleton></WorkPositionSkeleton>
        <WorkPositionSkeleton></WorkPositionSkeleton>
      </ol>
    </div>
  );
};
const WorkPositionSkeleton = () => {
  return (
    <li className="mb-6 ms-4 w-full">
      <div className="absolute w-3 h-3 bg-gray-500 rounded-full mt-1.5 -start-1.5 border border-gray-500" />
      <p className="mb-2 skeleton w-36 h-3 " />
      <h3 className="mb-2 skeleton w-64 h-4 " />
      <p className="mb-1 mr-12 skeleton w-6/7 h-3" />
      <p className="mb-2 mr-12 skeleton w-5/7 h-3" />
      <div className="flex flex-wrap gap-1">
        <p className="skeleton w-12 h-4"></p>
        <p className="skeleton w-12 h-4"></p>
        <p className="skeleton w-12 h-4"></p>
      </div>
    </li>
  );
};
