"use client";

import React, { useEffect, useState } from 'react';
import TemplateComponent from '../../components/TemplateComponent';

export default function Home() {
  const [items, setItems] = useState<{ text: string; link: { [key: string]: string } }[]>([]);


  useEffect(() => {
    fetch('/database.json')
      .then((response) => response.json())
      .then((data) => {
        const items = Object.keys(data.cse.csf222).map((key) => ({
          text: key,
          link: data.cse.csf222[key],
        }));
        setItems(items);
      });
  }, []);

  return <TemplateComponent category="CS F222 : Discrete Structures for Computer Science" items={items} />;
}