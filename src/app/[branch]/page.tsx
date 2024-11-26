// "use client";
// // import { useRouter } from 'next/navigation'
// // import { usePathname, useSearchParams } from 'next/navigation'
// import { usePathname } from 'next/navigation'
// import NotFound from "next/error"; // Import the NotFound component

// export default function Home() {
//   // const router = useRouter()
//   const pathname = usePathname()
//   const branches = ['/cse', '/elec', '/mech', '/ch', '/eco', '/math', '/phy', '/chem', '/bio', '/fy'];
//   let accepted = false;
//   // if (pathname.includes()) {
//   //   router.push(`/${pathname}`);
//   // } else {
//   //   // 404
//   //   return null;
//   // }
//   branches.forEach((branch) => {
//     if (pathname==(branch)) {
//       accepted = true;
//       // console.log(`Accepted: ${accepted}`);
//       // console.log(`Branch: ${branch}`);
//       // console.log(`Pathname: ${pathname}`);
//       // return router.push(`/${branch}`);
//       // router.push(`/${branch}`);
//     }
//   });

  
//   console.log(accepted);
//   if (accepted) {
//     return (
//       <div>
//         {pathname}
//         <br />
//         {"Hey guys sorry, I'll work on this later...if you are just exploring the website, checkout cse/csf222"}
//       </div>
//     )
//   } else {
//     // 404
//    return <NotFound statusCode={404} />; 
//   }
// }

"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import DisciplineBox from '../components/disciplineBox';
import Nav from '../components/nav';
import NotFound from 'next/error';

export default function Home() {
  const pathname = usePathname();
  const branches = ['/cse', '/elec', '/mech', '/ch', '/eco', '/math', '/phy', '/chem', '/bio', '/fy'];
  const branchTag: { [key: string]: string } = {
    "/cse": "Computer Science Engineering",
    "/elec": "Electrical Engineering",
    "/mech": "Mechanical Engineering",
    "/ch": "Chemical Engineering",
    "/eco": "MSc. Economics",
    "/math": "MSc. Mathematics",
    "/phy": "MSc. Physics",
    "/chem": "MSc. Chemistry",
    "/bio": "MSc. Biological Sciences",
    "/fy": "First Year"
  };
  const [subjects, setSubjects] = useState<string[]>([]);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const branch = pathname.slice(1); // Remove leading slash
    if (branches.includes(`/${branch}`)) {
      setAccepted(true);
      fetch('/database.json')
        .then((response) => response.json())
        .then((data) => {
          const branchData = data[branch];
          if (branchData) {
            setSubjects(Object.keys(branchData));
          }
        });
    } else {
      setAccepted(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!accepted) {
    return <NotFound statusCode={404} />;
  }

  return (
    <div>
      {/* <h1>{pathname.slice(1).toUpperCase()}</h1> */}
      <Nav text={`${pathname.slice(1).toUpperCase()} : ${branchTag[pathname]}`} />

      <div style={{ position: "absolute", top:"85px" }}>
        {subjects.map((subject, index) => (
          <DisciplineBox
            key={index}
            text={subject}
            link={`${pathname}/${subject}`}
            className="draggable"
            style={{ position: 'relative', display: 'block' }}
          />
        ))}
      </div>
    </div>
  );
}