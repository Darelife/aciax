"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import DisciplineBox from '../components/disciplineBox';
import Nav from '../components/nav';
import NotFound from 'next/error';
import withAuth from '../../../hoc/withAuth';

function Home() {
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

export default withAuth(Home);