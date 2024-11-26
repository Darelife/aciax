"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import TemplateComponent from '../../components/TemplateComponent';
import NotFound from 'next/error';

export default function Home() {
  const pathname = usePathname();
  const branch = pathname.split('/')[1];
  const subject = pathname.split('/')[2];
  // const branches = ['/cse', '/elec', '/mech', '/ch', '/eco', '/math', '/phy', '/chem', '/bio', '/fy'];
  // const branchTag: { [key: string]: string } = {
  //   "cse": "Computer Science Engineering",
  //   "elec": "Electrical Engineering",
  //   "mech": "Mechanical Engineering",
  //   "ch": "Chemical Engineering",
  //   "eco": "MSc. Economics",
  //   "math": "MSc. Mathematics",
  //   "phy": "MSc. Physics",
  //   "chem": "MSc. Chemistry",
  //   "bio": "MSc. Biological Sciences",
  //   "fy": "First Year"
  // };
  
  const [accepted, setAccepted] = useState(false);

  // useEffect(() => {
  //   // const branch = pathname.split('/')[1];
  //   // const subject = pathname.split('/')[2];
  //   if (branches.includes(`/${branch}`)) {
  //     setAccepted(true);
  //     fetch('/database.json')
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const branchData = data[branch];
  //         const subjectData = branchData[subject];
  //         if (subjectData) {
  //           setSubjects(Object.keys(subjectData));
  //         }
  //       });
  //   } else {
  //     setAccepted(false);
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname]);

  // const [items, setItems] = useState<{ text: string; link: { [key: string]: string } }[]>([]);

  // subjects.map((subject, index) => {})

  const [items, setItems] = useState<{ text: string; link: { [key: string]: string } }[]>([]);
  useEffect(() => {
    fetch('/database.json')
      .then((response) => response.json())
      .then((data) => {
        const items = Object.keys(data[branch][subject]).map((key) => ({
          text: key,
          link: data[branch][subject][key],
        }));
        if (items) {
          setAccepted(true);
        }
        setItems(items);
      });
  });

  


  
  if (accepted) {
    // return (
    //   <div>
    //     {/* <h1>{pathname.slice(1).toUpperCase()}</h1> */}
    //     <Nav text={`${branch.toUpperCase()} : ${branchTag[branch]}`} />

    //     <div style={{ position: "absolute", top:"85px" }}>
    //       {subjects.map((subject, index) => (
    //         <DisciplineBox
    //           key={index}
    //           text={subject}
    //           link={`${pathname}/${subject}`}
    //           className="draggable"
    //           style={{ position: 'relative', display: 'block' }}
    //         />
    //       ))}
    //     </div>
    //   </div>
    // );

    return (
      <div>
        <TemplateComponent category="CS F222 : Discrete Structures for Computer Science" items={items} />
      </div>
    )
  } else {
    return <NotFound statusCode={404} />;
  }
}