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
