"use client";

import React, { useEffect, useState, useContext } from 'react';
import { DragEventArgs, Draggable } from '@syncfusion/ej2-base';
import DisciplineBox from './components/disciplineBox';
import Nav from './components/nav';
import withAuth from '../../hoc/withAuth';
import AuthContext from '../../context/AuthContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

function Home() {
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  const [items] = useState([
    { text: "computer science", link: "/cse" },
    // { text: "phoenix", link: "/elec" },
    { text: "math n comp", link: "/mnc" },
    { text: "electronics n comm", link: "/ece" },
    { text: "electrical n electronics", link: "/eee" },
    { text: "electronics n instrumentation", link: "/eni" },
    { text: "mechanical", link: "/mech" },
    { text: "chemical", link: "/ch" },
    { text: "economics", link: "/eco" },
    { text: "mathematics", link: "/math" },
    { text: "physics", link: "/phy" },
    { text: "chemistry", link: "/chem" },
    { text: "biology", link: "/bio" },
    { text: "bits", link: "/bits" },
  ]);

  useEffect(() => {
    const draggableElements = document.querySelectorAll('.draggable');
    draggableElements.forEach((element, index) => {
      let startX: number;
      let startY: number;

      new Draggable(element as HTMLElement, {
        clone: false,
        dragStop: (args: DragEventArgs) => {
          if (args.element) {
            const rect = args.element.getBoundingClientRect();
            const windowWidth = window.innerWidth;

            if (rect.right >= windowWidth) {
              // Remove the item if its right edge touches or exceeds the page boundary
                if (items[index].text !== "computer science") {
                  // items.splice(index, 1);
                  args.element.style.display = 'none';
                }
            }
          }
        },
      });

      // Prevent default touch behavior to avoid accidental page reloads
      element.addEventListener('touchstart', (event) => {
        const touchEvent = event as TouchEvent;
        touchEvent.preventDefault();
        const touch = touchEvent.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
      }, { passive: false });

      element.addEventListener('touchend', (event) => {
        const touchEvent = event as TouchEvent;
        const touch = touchEvent.changedTouches[0];
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
  const handleLogout = () => {
    Cookies.remove('auth');
    logout();
    router.push('/login');
  };

  return (
    <div>
      <Nav text="ACIAX : The Academic Information Exchange Hub For BITS Goa" />
      <button onClick={handleLogout}>Logout</button>
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

export default withAuth(Home);