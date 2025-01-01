// "use client";

// import React, { useEffect, useState, useContext } from 'react';
// import { DragEventArgs, Draggable } from '@syncfusion/ej2-base';
// import DisciplineBox from './components/disciplineBox';
// import Nav from './components/nav';
// import withAuth from '../../hoc/withAuth';
// import AuthContext from '../../context/AuthContext';
// import Cookies from 'js-cookie';
// import { useRouter } from 'next/navigation';

// function Home() {
//   const router = useRouter();
//   const { logout } = useContext(AuthContext);
//   const [items] = useState([
//     { text: "computer science", link: "/cse" },
//     // { text: "phoenix", link: "/elec" },
//     { text: "math n comp", link: "/mnc" },
//     { text: "electronics n comm", link: "/ece" },
//     { text: "electrical n electronics", link: "/eee" },
//     { text: "electronics n instrumentation", link: "/eni" },
//     { text: "mechanical", link: "/mech" },
//     { text: "chemical", link: "/ch" },
//     { text: "economics", link: "/eco" },
//     { text: "mathematics", link: "/math" },
//     { text: "physics", link: "/phy" },
//     { text: "chemistry", link: "/chem" },
//     { text: "biology", link: "/bio" },
//     { text: "bits", link: "/bits" },
//   ]);

//   useEffect(() => {
//     const draggableElements = document.querySelectorAll('.draggable');
//     draggableElements.forEach((element, index) => {
//       let startX: number;
//       let startY: number;

//       new Draggable(element as HTMLElement, {
//         clone: false,
//         dragStop: (args: DragEventArgs) => {
//           if (args.element) {
//             const rect = args.element.getBoundingClientRect();
//             const windowWidth = window.innerWidth;

//             if (rect.right >= windowWidth) {
//               // Remove the item if its right edge touches or exceeds the page boundary
//                 if (items[index].text !== "computer science") {
//                   // items.splice(index, 1);
//                   args.element.style.display = 'none';
//                 }
//             }
//           }
//         },
//       });

//       // Prevent default touch behavior to avoid accidental page reloads
//       element.addEventListener('touchstart', (event) => {
//         const touchEvent = event as TouchEvent;
//         touchEvent.preventDefault();
//         const touch = touchEvent.touches[0];
//         startX = touch.clientX;
//         startY = touch.clientY;
//       }, { passive: false });

//       element.addEventListener('touchend', (event) => {
//         const touchEvent = event as TouchEvent;
//         const touch = touchEvent.changedTouches[0];
//         const endX = touch.clientX;
//         const endY = touch.clientY;
//         const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

//         if (distance < 10) { // Treat as a click if the drag distance is very low
//           const link = items[index].link;
//           if (link) {
//             window.location.href = link;
//           }
//         }
//       });


//     });
//   }, [items]);
//   const handleLogout = () => {
//     Cookies.remove('auth');
//     logout();
//     router.push('/login');
//   };

//   return (
//     <div>
//       <Nav text="ACIAX : The Academic Information Exchange Hub For BITS Goa" />
//       <button onClick={handleLogout}>Logout</button>
//       <br />
//       <div style={{ position: "relative" }}>
//         {items.map((item, index) => (
//           <DisciplineBox
//             key={index}
//             className="draggable"
//             text={item.text}
//             link={item.link}
//             style={{ position: 'absolute', top: `${30 + index * 30}px` }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default withAuth(Home);

"use client";

import React, { useEffect, useState, useContext } from 'react';
import { DragEventArgs, Draggable } from '@syncfusion/ej2-base';
import DisciplineBox from './components/disciplineBox';
import Nav from './components/nav';
import withAuth from '../../hoc/withAuth';
import AuthContext from '../../context/AuthContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Contributors from './components/Contributors';

function Home() {
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  const [items] = useState([
    { text: "computer science", link: "/cse" },
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
    const isMobile = window.innerWidth < 800;
    if (!isMobile) {
      const draggableElements = document.querySelectorAll('.draggable');
      draggableElements.forEach((element, index) => {
        let startX: number;
        let startY: number;
        let isDragging = false;

        new Draggable(element as HTMLElement, {
          clone: false,
          dragStart: () => {
            isDragging = true;
          },
          dragStop: (args: DragEventArgs) => {
            isDragging = false;
            if (args.element) {
              const rect = args.element.getBoundingClientRect();
              const windowWidth = window.innerWidth;

              if (rect.right >= windowWidth) {
                // Remove the item if its right edge touches or exceeds the page boundary
                if (items[index].text !== "computer science") {
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
          // isDragging = false;
        }, { passive: false });

        element.addEventListener('touchmove', () => {
          isDragging = true;
        });

        element.addEventListener('touchend', (event) => {
          isDragging = false;
          const touchEvent = event as TouchEvent;
          const touch = touchEvent.changedTouches[0];
          const endX = touch.clientX;
          const endY = touch.clientY;
          const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

          if (!isDragging && distance < 10) { // Treat as a click if the drag distance is very low
            const link = items[index].link;
            if (link) {
              window.location.href = link;
            }
          }
        });

        // Prevent default drag behavior on the link element
        const linkElement = element.querySelector('a');
        if (linkElement) {
          linkElement.addEventListener('dragstart', (event) => {
            event.preventDefault();
          });
        }
      });
    }
  }, [items]);

  const handleLogout = () => {
    Cookies.remove('auth');
    logout();
    router.push('/login');
  };

  return (
    <div>
      <Nav text="ACIAX : The Academic Information Exchange Hub For BITS Goa" onLogout={handleLogout} />
      {/* <button onClick={handleLogout}>Logout</button> */}
      <br />
      {/* <div style={{ position: "relative" }}>
        {items.map((item, index) => (
          <DisciplineBox
            key={index}
            className="draggable"
            text={item.text}
            link={item.link}
            style={{ position: 'absolute', top: `${30 + index * 30}px` }}
          />
        ))}
      </div>    */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {items.map((item, index) => (
          <DisciplineBox
            key={index}
            className={index === items.length - 1 ? 'col-span-1 text-center draggable' : 'draggable'}
            text={item.text}
            link={item.link}
          />
        ))}
      </div>





      <br />
      {/* <div className='text-green-400'>
        Hey guys, this website will only function if you all help out by contributing to the <u><a href="https://github.com/Darelife/aciax/">Github Repo</a></u>
        <br />
        Or just the <u><a href="https://github.com/Darelife/aciax/blob/master/public/database.json">Database</a></u>, <u><a href="https://github.com/Darelife/aciax/blob/master/public/checklist.json">Checklist</a></u>, and the <u><a href="https://github.com/Darelife/aciax/blob/master/public/subjectNames.json">Subject Names</a></u>
      </div> */}
      <div className="text-green-400 p-4 bg-gray-800 rounded-md m-5">
  <p>
    Hey, this website will only function if you help out by contributing to the{' '}
    <u>
      <a
        href="https://github.com/Darelife/aciax/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-400"
      >
        Github Repo
      </a>
    </u>.
  </p>
  <p className="mt-6">
    Or you can contribute directly to the{' '}
    <u>
      <a
        href="https://github.com/Darelife/aciax/blob/master/public/database.json"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-400"
      >
        Database
      </a>
    </u>,{' '}
    <u>
      <a
        href="https://github.com/Darelife/aciax/blob/master/public/checklist.json"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-400"
      >
        Checklist
      </a>
    </u>, and the{' '}
    <u>
      <a
        href="https://github.com/Darelife/aciax/blob/master/public/subjectNames.json"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-400"
      >
        Subject Names
      </a>
    </u>.
  </p>
  <p className="mt-6">
    The Contribution Guide is in the <u><a 
      className="hover:text-blue-400" 
      href="https://github.com/Darelife/aciax/blob/master/README.md" 
      rel="noopener noreferrer" 
      target="_blank">README.md</a></u> file of the github repository
  </p>
</div>

      <Contributors />
    </div>
  );
}

export default withAuth(Home);