"use client";
// import { useRouter } from 'next/navigation'
// import { usePathname, useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import NotFound from "next/error"; // Import the NotFound component

export default function Home() {
  // const router = useRouter()
  const pathname = usePathname()
  const branches = ['/cse', '/elec', '/mech', '/ch', '/eco', '/math', '/phy', '/chem', '/bio', '/fy'];
  let accepted = false;
  // if (pathname.includes()) {
  //   router.push(`/${pathname}`);
  // } else {
  //   // 404
  //   return null;
  // }
  branches.forEach((branch) => {
    if (pathname==(branch)) {
      accepted = true;
      console.log(`Accepted: ${accepted}`);
      console.log(`Branch: ${branch}`);
      console.log(`Pathname: ${pathname}`);
      // return router.push(`/${branch}`);
      // router.push(`/${branch}`);
    }
  });
  console.log(accepted);
  if (accepted) {
    return (
      <div>
        {pathname}
        <br />
        {"Hey guys sorry, I'll work on this later...if you are just exploring the website, checkout cse/csf222"}
      </div>
    )
  } else {
    // 404
   return <NotFound statusCode={404} />; 
  }
}