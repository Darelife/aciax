"use client";

import React, { useEffect, useState } from 'react';
import { Draggable } from '@syncfusion/ej2-base';
import DisciplineBox from './components/disciplineBox';
import Nav from './components/nav';

export default function Home() {
  const [items, setItems] = useState([
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
  ]);

  useEffect(() => {
    const draggableElements = document.querySelectorAll('.draggable');
    draggableElements.forEach((element, index) => {
      let startX: number;
      let startY: number;

      new Draggable(element as HTMLElement, {
        clone: false,
        dragStop: (args) => {
          const rect = args.element.getBoundingClientRect();
          const windowWidth = window.innerWidth;

          if (rect.right >= windowWidth) {
            // Remove the item if its right edge touches or exceeds the page boundary
            setItems((prevItems) => prevItems.filter((_, i) => i !== index));
          }
        },
      });

      // Prevent default touch behavior to avoid accidental page reloads
      element.addEventListener('touchstart', (event) => {
        event.preventDefault();
        const touch = event.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
      }, { passive: false });

      element.addEventListener('touchend', (event) => {
        const touch = event.changedTouches[0];
        const endX = touch.clientX;
        const endY = touch.clientY;
        const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

        if (distance < 10) { // Treat as a click if the drag distance is very low
          const link = items[index].link;
          if (link) {
            window.location.href = link;
          }
        }
      });
    });
  }, [items]);

  return (
    <div>
      <Nav text="ACIAX : The Academic Information Exchange Hub For BITS Goa" />
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