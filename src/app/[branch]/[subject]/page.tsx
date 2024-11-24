// "use client";

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import TemplateComponent from '../../components/TemplateComponent';

// export default function SubjectPage() {
//   const router = useRouter();
//   const { branch, subject } = router.query;

//   const [items, setItems] = useState<{ text: string; link: { [key: string]: string } }[]>([]);

//   useEffect(() => {
//     if (router.isReady && typeof branch === 'string' && typeof subject === 'string') {
//       fetch('/database.json')
//         .then((response) => response.json())
//         .then((data) => {
//           const subjectData = data[branch]?.[subject];
//           if (subjectData) {
//             const items = Object.keys(subjectData).map((key) => ({
//               text: key,
//               link: subjectData[key],
//             }));
//             setItems(items);
//           }
//         });
//     }
//   }, [router.isReady, branch, subject]);

//   if (!router.isReady || !branch || !subject) {
//     return <div>Loading...</div>;
//   }

//   return <TemplateComponent category={`${branch} : ${subject}`} items={items} />;
// }

// "use client";

// export default function Home() {
 
//   return (
//     <div>
//       Hello World!
//     </div>
//   );
// }
"use client";
// import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
// import { usePathname, useSearchParams } from 'next/navigation'

export default function Home() {
  // const router = useRouter()
  const pathname = usePathname()
  return <p>{pathname}</p>
  // return (
  //   <div>
  //     Hello World!
  //   </div>
  // );
}