import React from 'react';

type DisciplineBoxProps = {
  text: string;
  link?: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function DisciplineBox({ text, className, style, link }: DisciplineBoxProps) {
  return (
    <div className={`text-green-400 font-mono text-lg draggable discipline-box ${className}`} style={style}>
      <a href={link}>{`>${text}`}</a>
    </div>
  );
}