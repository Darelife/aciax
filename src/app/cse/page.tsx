"use client";

import DisciplineBox from '../components/disciplineBox';
import Nav from '../components/nav';

export default function Home() {

  const items = [
    { text: "CS F111 - Computer Programming", link: "/cse/csf111" },
    { text: "CS F211 - Data Structures & Algorithms", link: "/cse/csf211" },
    { text: "CS F222 - Discrete Structures for CS", link: "/cse/csf222" }
    
  ];

  return (
    <div>
      <Nav text="ACIAX : CSE - computer science engineering" />
      <br />
      <div style={{ position: "relative" }}>
        {items.map((item, index) => (
          <DisciplineBox
            key={index}
            className="draggable"
            text={item.text}
            link={item.link}
            // style={{ position: 'absolute', top: `${30 + index * 30}px` }}
          />
        ))}
      </div>
    </div>
  );
}