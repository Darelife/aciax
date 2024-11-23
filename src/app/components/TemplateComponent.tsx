import React, { useState } from 'react';
import DisciplineBox from './disciplineBox';
import Nav from './nav';

type TemplateComponentProps = {
  category: string;
  items: { text: string; link: { [key: string]: string[] } }[];
};

export default function TemplateComponent({ category, items }: TemplateComponentProps) {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div>
      <Nav text={category} />
      <br />
      <div style={{ position: "absolute", top: "85px" }}>
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index}>
              <div onClick={() => toggleExpand(index)} style={{ cursor: 'pointer' }}>
                <DisciplineBox
                  text={item.text}
                  style={{ position: 'relative', display: 'block' }}
                  toggle={expandedItems.includes(index) ? "▼ " : "▶ "}
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
                    : 'max-height 0.2s ease-out, opacity 0.1s ease-out, transform 0.1s ease-out'
                }}
              >
                {Object.keys(item.link).map((heading, headingIndex) => (
                  <div key={headingIndex}>
                    {/* <h3>{heading}</h3> */}
                    <a target="_blank" href={item.link[heading]}>{heading}</a>
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