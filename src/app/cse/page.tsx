"use client";

import React, { useState } from 'react';
import DisciplineBox from '../components/disciplineBox';
import Nav from '../components/nav';
import withAuth from '../../../hoc/withAuth';

function Home() {
  const [items] = useState([
    { text: "CS F111: Computer Programming", link: "/cse/csf111" },
    { text: "CS F222: Discrete Structures", link: "/cse/csf222" },
    { text: "CS F211: Data Struc. & Algos", link: "/cse/csf211" },
  ]);


  return (
    <div>
      <Nav text="CSE : Computer Science Engineering" />
      <br />
      <div style={{ position: "absolute", top:"85px" }}>
        {items.map((item, index) => (
          <DisciplineBox
            key={index}
            text={item.text}
            link={item.link}
            style={{ position: 'relative', display:'block' }}
          />
        ))}
      </div>
    </div>
  );
}

export default withAuth(Home);