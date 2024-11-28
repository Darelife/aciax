import React from 'react';

type DisciplineBoxProps = {
  text: string;
  link?: string;
  className?: string;
  style?: React.CSSProperties;
  toggle?: string;
};

export default function DisciplineBox({ text, className, style, link, toggle }: DisciplineBoxProps) {
  const arrow = toggle ? toggle : '>';
  // replace all spaces with "\0"
  text = text.replace(/ /g, '\0');
  return (
    <div className={`text-green-400 font-mono text-lg draggable discipline-box ${className}`} style={style}>
      <a href={link}>{`${arrow}${text}`}</a>
    </div>
  );
}