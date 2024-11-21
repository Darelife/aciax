import React from 'react';

type NavProps = {
  text: string;
};

export default function Nav({ text }: NavProps) {
  return (
    <div className="text-green-500 font-mono text-xl">
      {text} : The Academic Information Exchange Hub For BITS Goa
    </div>
  );
}