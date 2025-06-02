// import React, { useEffect, useRef, useState } from 'react';
// import html2pdf from 'html2pdf.js';

// type Employer = {
//   slug: string;
//   name: string;
// };

// type Position = {
//   employer_slug: string;
//   name: string;
//   description: string;
//   skills: string;
//   date: string;
// };

// const CVGenerator: React.FC = () => {
//   const [employers, setEmployers] = useState<Employer[]>([]);
//   const [positions, setPositions] = useState<Position[]>([]);
//   const cvRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Fetch or import the JSON
//     fetch('/src/assets/employers.json')
//       .then(res => res.json())
//       .then(setEmployers);
//     fetch('/src/assets/positions.json')
//       .then(res => res.json())
//       .then(setPositions);
//   }, []);

//   const handleDownload = () => {
//     if (cvRef.current) {
//       html2pdf()
//         .set({
//           margin: 0.5,
//           filename: 'ralfazza-cv.pdf',
//           html2canvas: { scale: 2 },
//           jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//         })
//         .from(cvRef.current)
//         .save();
//     }
//   };

//   const renderEmployer = (employer: Employer) => {
//     const empPositions = positions.filter(p => p.employer_slug === employer.slug);
//     return (
//       <div key={employer.slug} className="mb-4">
//         <h3 className="mb-2 font-bold uppercase">{employer.name}</h3>
//         {empPositions.map((position, index) => (
//           <div key={index} className="mb-2 ml-4">
//             <h4 className="font-bold">{position.name}</h4>
//             <span className="text-sm text-gray-500">{position.date}</span>
//             <p>{position.description}</p>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="p-4">
//       <button
//         onClick={handleDownload}
//         className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
//       >
//         Download CV as PDF
//       </button>

//       <div ref={cvRef} className="bg-white p-6 text-black w-full max-w-4xl mx-auto font-mono">
//         {/* Header */}
//         <div className="text-center mb-4">
//           <h1 className="text-2xl font-bold">Ralfazza Rajariandhana</h1>
//           <p>Indonesia</p>
//           <p>
//             <a className="underline" href="mailto:rajariandhana@gmail.com">rajariandhana@gmail.com</a> | 
//             <a className="underline" href="https://linkedin.com/in/rajariandhana">linkedin.com/in/rajariandhana</a> |
//             <a className="underline" href="https://ralfazza.com">ralfazza.com</a>
//           </p>
//           <p className="mt-2">
//             Third year computer science student currently studying in Australia...
//           </p>
//         </div>

//         {/* Education */}
//         <div className="mb-4">
//           <h2 className="text-lg font-bold uppercase">Education</h2>
//           <hr className="border-black mb-2" />
//           {/* ... statically include your education here ... */}
//         </div>

//         {/* Experience */}
//         <div className="mb-4">
//           <h2 className="text-lg font-bold uppercase">Experience</h2>
//           <hr className="border-black mb-2" />
//           {employers.map(renderEmployer)}
//         </div>

//         {/* Skills */}
//         <div className="mb-4">
//           <h2 className="text-lg font-bold uppercase">Skills</h2>
//           <hr className="border-black mb-2" />
//           <ul className="list-disc ml-6">
//             <li>Data structures and algorithms using C/C++</li>
//             <li>Web frameworks: Laravel, Gin, Tailwind CSS, Alpine.js</li>
//             <li>Unity C# for game dev</li>
//             <li>Python for data analysis (pandas, matplotlib)</li>
//             <li>MySQL, SQLite, PostgreSQL</li>
//           </ul>
//         </div>

//         {/* Languages */}
//         <div className="mb-4">
//           <h2 className="text-lg font-bold uppercase">Languages</h2>
//           <hr className="border-black mb-2" />
//           <ul className="list-disc ml-6">
//             <li>Indonesian (Native)</li>
//             <li>English (IELTS 7.0)</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CVGenerator;
