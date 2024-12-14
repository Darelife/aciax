"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Nav from '../../../components/nav';
import withAuth from '../../../../../hoc/withAuth';

type ChecklistData = {
  [branch: string]: {
    [subject: string]: {
      name: string;
      CheckList: {
        [category: string]: string[];
      };
    };
  };
};

const ChecklistPage = () => {
  const pathname = usePathname();
  const [accepted, setAccepted] = useState(false);
  const [checklistData, setChecklistData] = useState<ChecklistData>({});
  const [loading, setLoading] = useState(true);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const branch = pathname.split('/')[1];
  const subject = pathname.split('/')[2];

  useEffect(() => {
    setLoading(true);
    fetch('/checklist.json')
      .then((response) => response.json())
      .then((data) => {
        setChecklistData(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const savedCheckedItems = localStorage.getItem(`${branch}-${subject}-checkedItems`);
    if (savedCheckedItems) {
      setCheckedItems(JSON.parse(savedCheckedItems));
    }
  }, [branch, subject]);

  useEffect(() => {
    if (Object.keys(checklistData).length > 0 && checklistData[branch] && checklistData[branch][subject]) {
      setAccepted(true);
    } else {
      setAccepted(false);
    }
  }, [checklistData, branch, subject]);

  const handleCheckboxChange = (item: string) => {
    const updatedCheckedItems = {
      ...checkedItems,
      [item]: !checkedItems[item],
    };
    setCheckedItems(updatedCheckedItems);
    localStorage.setItem(`${branch}-${subject}-checkedItems`, JSON.stringify(updatedCheckedItems));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-400">
        Loading...
      </div>
    );
  }

  if (!accepted) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-400">
        Not Found
      </div>
    );
  }

  const subjectData = checklistData[branch][subject];

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      <Nav text={`${subjectData.name}`} />
      <div className="max-w-4xl mx-auto mt-24 px-4">
        {Object.keys(subjectData.CheckList).map((category, index) => (
          <div
            key={index}
            className="bg-[var(--foreground)] text-[var(--background)] rounded-lg shadow-lg mb-6 p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">{category}</h2>
            <ul className="list-none">
              {subjectData.CheckList[category].map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex items-center mb-3 border-b border-gray-200 pb-2"
                >
                  <label className="flex items-center text-lg">
                    <input
                      type="checkbox"
                      checked={checkedItems[item] || false}
                      onChange={() => handleCheckboxChange(item)}
                      className="mr-3 cursor-pointer"
                    />
                    {item}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuth(ChecklistPage);
