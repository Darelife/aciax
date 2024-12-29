import React, { useState, useEffect } from 'react';
import DisciplineBox from './disciplineBox';
import Nav from './nav';
import { Draggable } from '@syncfusion/ej2-base';


type TemplateComponentProps = {
  category: string;
  items: { text: string; link: { [key: string]: string } }[];
  courseId: string;
};

export default function TemplateComponent({ category, items, courseId }: TemplateComponentProps) {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  useEffect(() => {
    // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isMobile = window.innerWidth < 800;
    if (!isMobile) {
      const draggableElements = document.querySelectorAll('.draggable-container');
      draggableElements.forEach((element) => {
        new Draggable(element as HTMLElement, {
          clone: false,
          dragStart: () => {
            element.classList.add('dragging');
          },
          dragStop: () => {
            element.classList.remove('dragging');
          },
        });
        // Prevent default touch actions to avoid pull-to-refresh
        element.addEventListener('touchmove', (e) => {
          e.preventDefault();
        }, { passive: false }); // Passive: false allows preventDefault
      });
    }
  }, [items]);

  return (
    <div>
      <Nav text={category} checklist={`${courseId}/checklist`}/>
      {/* <a href={`${courseId}/checklist`}>Checklist</a> */}
      <br />
      {/* <div style={{ position: "absolute", top: "85px" }}> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="draggable-container">
              <div onClick={() => toggleExpand(index)} style={{ cursor: 'pointer' }}>
                <DisciplineBox
                  text={item.text}
                  style={{ position: 'relative', display: 'block' }}
                  toggle={expandedItems.includes(index) ? "▼\0 " : "> "}
                />
              </div>
              <div
                style={{
                  maxHeight: expandedItems.includes(index) ? '1000px' : '0',
                  opacity: expandedItems.includes(index) ? 1 : 0,
                  overflow: 'hidden',
                  transform: expandedItems.includes(index) ? 'translateY(0)' : 'translateY(-10px)',
                  transition: expandedItems.includes(index)
                    ? 'max-height 0.2s ease-in, opacity 0.2s ease-in, transform 0.2s ease-in'
                    : 'max-height 0.2s ease-out, opacity 0.1s ease-out, transform 0.1s ease-out',
                  marginLeft:'20px'
                }}
              >
                <div style={{marginTop: '10px'}}>
                </div>
                {Object.keys(item.link).map((heading, headingIndex) => (
                  <div key={headingIndex} className="text-[#a3a3a3]">
                    <a target="_blank" href={item.link[heading]} className="overflow-ellipsis">
                      <span className="text-[#01e201]">{'>_ '}</span>
                      <span className="overflow-ellipsis">
                        {heading.length > 33 ? `${heading.slice(0, 30)}...` : heading}
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No items available</p>
        )}
      </div>
    </div>
  );
}

// "use client";

// import React, { useState, useEffect } from 'react';
// import DisciplineBox from './DisciplineBox';
// import Nav from './Nav';
// import { Draggable } from '@syncfusion/ej2-base';

// type TemplateComponentProps = {
//   category: string;
//   items: { text: string; link: { [key: string]: string } }[];
// };

// const TemplateComponent: React.FC<TemplateComponentProps> = ({ category, items }) => {
//   const [expandedItems, setExpandedItems] = useState<number[]>([]);

//   const toggleExpand = (index: number) => {
//     setExpandedItems((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
//     );
//   };

  // useEffect(() => {
  //   const draggableElements = document.querySelectorAll('.draggable-container');
  //   draggableElements.forEach((element) => {
  //     new Draggable(element as HTMLElement, {
  //       clone: false,
  //       dragStart: () => {
  //         element.classList.add('dragging');
  //       },
  //       dragStop: () => {
  //         element.classList.remove('dragging');
  //       },
  //     });

  //     // Prevent default drag behavior on the link elements
  //     const linkElements = element.querySelectorAll('a');
  //     linkElements.forEach((linkElement) => {
  //       linkElement.addEventListener('dragstart', (event) => {
  //         event.preventDefault();
  //       });
  //     });
  //   });
  // }, [items]);


// };

// export default TemplateComponent;