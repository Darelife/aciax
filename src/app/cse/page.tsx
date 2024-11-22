"use client";

import DisciplineBox from '../components/disciplineBox';
import Nav from '../components/nav';

export default function Home() {
  const items = ([
    { text: "CS F111: Computer Programming", link: "/cse/csf111" },
    { text: "CS F222: Discrete Structures", link: "/cse/csf222" },
    { text: "CS F211: Data Structures & Algos", link: "/cse/csf211" },
  ]);

  return (
    <div>
      <Nav text="ACIAX : The Academic Information Exchange Hub For BITS Goa" />
      <br />
      <div style={{ position: "relative" }}>
        {items.map((item, index) => (
          <DisciplineBox
            key={index}
            // className="draggable"
            text={item.text}
            link={item.link}
            style={{ position:'relative', display:'block' }}
          />
        ))}
      </div>
    </div>
  );
}