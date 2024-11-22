import React from 'react';

type NavProps = {
  text: string;
};

export default function Nav({ text }: NavProps) {
  return (
    <div className="text-green-500 font-mono text-xl">
      {text}
    </div>
  );
}