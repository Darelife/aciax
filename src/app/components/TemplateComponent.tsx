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
    maxHeight: expandedItems.includes(index) ? '300px' : '0',
    opacity: expandedItems.includes(index) ? 1 : 0,
    overflow: 'hidden',
    transform: expandedItems.includes(index)
      ? 'translateY(0)'
      : 'translateY(-10px)',
    transition: expandedItems.includes(index)
      ? 'max-height 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease-in, transform 0.4s ease-out'
      : 'max-height 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease-out, transform 0.2s ease-in',
    // paddingLeft: '20px',
    marginTop:'5px',
    borderRadius: '8px',
    // backgroundColor: '#1a1a1a',
    // boxShadow: expandedItems.includes(index)
    //   ? '0px 4px 8px rgba(0, 0, 0, 0.2)'
    //   : 'none',
    padding: expandedItems.includes(index) ? '10px 10px 10px 20px' : '0px 0px 0px 20px',
    // paddingLeft:'20px',
    color: '#ffffff',
  }}
  className="flex items-center px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-gray-900 to-gray-800"
>
  <div style={{ marginTop: '10px' }}>
    {Object.keys(item.link).map((heading, headingIndex) => (
      <div key={headingIndex} className="text-[#d1d1d1] mb-2">
        <a
          target="_blank"
          href={item.link[heading]}
          // className="overflow-ellipsis hover:text-[#01e201] transition-transform duration-200 hover:scale-105"
        >
          <span className="text-[#01e201]">{'>_ '}</span>
          <span className="overflow-ellipsis">
            {heading.length > 33 ? `${heading.slice(0, 30)}...` : heading}
          </span>
        </a>
      </div>
    ))}
  </div>
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