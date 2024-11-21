"use client";

import React, { useEffect } from 'react';
import { Draggable } from '@syncfusion/ej2-base';
import DisciplineBox from './components/disciplineBox';
import Nav from './components/nav';

export default function Home() {
  useEffect(() => {
    const draggableElements = document.querySelectorAll('.draggable');
    draggableElements.forEach((element) => {
      new Draggable(element as HTMLElement, { clone: false });

      // Prevent default touch behavior to avoid accidental page reloads
      element.addEventListener('touchstart', (event) => {
        event.preventDefault();
      }, { passive: false });
    });
  }, []);

  const items = [
    { text: "computer science", link: "/cse" },
    { text: "pheonix", link: "/elec" },
    { text: "mechanical", link: "/mech" },
    { text: "chemical", link: "/ch" },
    { text: "economics", link: "/eco" },
    { text: "mathematics", link: "/math" },
    { text: "physics", link: "/phy" },
    { text: "chemistry", link: "/chem" },
    { text: "biology", link: "/bio" },
    { text: "first year", link: "/fy" },
  ];

  return (
    <div>
      <Nav text="ACIAX" />
      <br />
      <div style={{ position: "relative" }}>
        {items.map((item, index) => (
          <DisciplineBox
            key={index}
            className="draggable"
            text={item.text}
            link={item.link}
            style={{ position: 'absolute', top: `${30 + index * 30}px` }}
          />
        ))}
      </div>
    </div>
  );
}