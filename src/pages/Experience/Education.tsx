import { useEffect, useState } from "react";

interface Education {
  slug: string;
  name: string;
  link: string;
  start: string;
  end: string;
  description: string;
}

export default function Education() {
  const [educations, setEducations] = useState<Education[]>([]);
  // const [loadedSlugs, setLoadedSlugs] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/src/assets/education2.json")
      .then((res) => res.json())
      .then((data: Education[]) => {
        setEducations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching education data:", err);
        setLoading(false);
      });
  }, []);

  // const handleImageLoad = (slug: string) => {
  //   setLoadedSlugs((prev) => ({ ...prev, [slug]: true }));
  // };

  return (
    <section className="w-full">
      <h2 className="text-2xl mb-2 cursor-pointer">🎓 Where I study</h2>
      {loading ? (
        <ul>
          <EducationCardSkeleton></EducationCardSkeleton>
          <EducationCardSkeleton></EducationCardSkeleton>
          <EducationCardSkeleton></EducationCardSkeleton>
        </ul>
      ) : (
        <ul>
          {educations.map((education) => {
            return (
              <li
                key={education.slug}
                className="flex justify-center items-center gap-x-4 p-4 rounded-xl shadow-md bg-white mb-4"
              >
                <img
                  src={`/src/assets/logo/${education.slug}.png`}
                  alt={`${education.name} logo`}
                  className="w-20 h-full object-cover rounded-md"
                />
                <div className="w-fit">
                  <a
                    href={education.link}
                    target="_blank"
                    className="hover:underline"
                  >
                    <h3 className="text-lg font-semibold -mb-2">
                      {education.name}
                    </h3>
                  </a>
                  <span className="text-sm text-gray-500 -mb-2">
                    {education.start} - {education.end}
                  </span>
                  <p>{education.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

const EducationCardSkeleton = () => {
  return (
    <li className="flex justify-center items-center gap-x-4 p-4 rounded-xl shadow-md bg-white mb-4 w-full">
      <div className="w-24 h-20 skeleton flex justify-center items-center" />
      <div className="w-full h-20 flex flex-col gap-1">
        <p className="text-lg font-semibold h-5 w-52 skeleton"></p>
        <p className="text-sm text-gray-500 h-3 mb-1 w-32 skeleton"></p>
        <p className="h-4 w-6/7 skeleton"></p>
        <p className="h-4 w-5/7 skeleton"></p>
      </div>
    </li>
  )
};
