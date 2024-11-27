"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import TemplateComponent from '../../components/TemplateComponent';
import NotFound from 'next/error';
import withAuth from '../../../../hoc/withAuth';

function Home() {
  const pathname = usePathname();
  const branch = pathname.split('/')[1];
  const subject = pathname.split('/')[2];
  console.log(subject);

  const [accepted, setAccepted] = useState(false);
  const [items, setItems] = useState<{ text: string; link: { [key: string]: string } }[]>([]);
  const [loading, setLoading] = useState(true); // Introduce a loading state
  const [subjectTag, setSubjectTag] = useState<string>('');

  useEffect(() => {
    setLoading(true); // Start loading
    fetch('/database.json')
      .then((response) => response.json())
      .then((data) => {
        const items = Object.keys(data[branch]?.[subject] || {}).map((key) => ({
          text: key,
          link: data[branch][subject][key],
        }));
        if (items.length > 0) {
          setAccepted(true);
        }
        setItems(items);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setAccepted(false);
      })
      .finally(() => {
        setLoading(false); // Stop loading after fetching is complete
      });
    fetch('/subjectNames.json')
      .then((response) => response.json())
      .then((data) => {
        setSubjectTag(data[branch.toLowerCase()][subject.toLowerCase()]);
      })
  }, [branch, subject]); // Add branch and subject as dependencies to refetch when they change

  if (loading) {
    // Show a loading indicator while fetching data
    return <div>Loading...</div>;
  }

  if (accepted) {
    return (
      <div>
        <TemplateComponent category={`CS F${subject.slice(-3)} : ${subjectTag}`} items={items} />
      </div>
    );
  } else {
    return <NotFound statusCode={404} />;
  }
}

export default withAuth(Home);