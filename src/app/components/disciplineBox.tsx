import React from 'react';

type DisciplineBoxProps = {
  text: string;
  link?: string;
  className?: string;
  style?: React.CSSProperties;
  toggle?: string;
};

export default function DisciplineBox({
  text,
  className = '',
  style,
  link,
  toggle = '>',
}: DisciplineBoxProps) {
  return (
    <div
      className={`discipline-box flex items-center px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-gray-900 to-gray-800 ${className}`}
      style={style}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / 30).toFixed(2);
        const rotateY = ((x - centerX) / 30).toFixed(2);
        const gradientX = ((x / rect.width) * 100).toFixed(2);
        const gradientY = ((y / rect.height) * 100).toFixed(2);
        e.currentTarget.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        e.currentTarget.style.boxShadow = `0px 15px 25px rgba(0, 0, 0, 0.25), ${rotateY}px ${-rotateX}px 30px rgba(0, 0, 0, 0.2)`;
        e.currentTarget.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, #1f2937, #111827)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'rotateX(0) rotateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.background = 'linear-gradient(to right, #111827, #1f2937)';
      }}
    >
      {link ? (
        <a
          href={link}
          className="flex items-center space-x-2 hover:text-green-500 focus:text-green-600 transition-transform duration-300"
          rel="noopener noreferrer"
        >
          <span className="toggle-symbol">{toggle}</span>
          <span className="dontWrap">{text}</span>
        </a>
      ) : (
        <span className="flex items-center space-x-2">
          <span className="toggle-symbol">{toggle}</span>
          <span className="dontWrap">{text}</span>
        </span>
      )}
    </div>
  );
}
