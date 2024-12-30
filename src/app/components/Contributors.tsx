import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const repoOwner = 'Darelife';
  const repoName = 'aciax';

  useEffect(() => {
    async function fetchContributors() {
      try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contributors`);
        const data: Contributor[] = await response.json();

        for (let i = 0; i < data.length; i++) {
          const userResponse = await fetch(`https://api.github.com/users/${data[i].login}`);
          const userData = await userResponse.json();
          data[i].login = userData.name || data[i].login;
        }
        setContributors(data);
      } catch (error) {
        console.error('Error fetching contributors:', error);
      }
    }

    fetchContributors();
  }, []);

  return (
    <div className="p-6 rounded-lg bg-gray-900 shadow-lg">
      <h2 className="text-white text-2xl font-semibold mb-4">Contributors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {contributors.map((contributor) => (
          <div
            key={contributor.id}
            className="relative flex flex-col items-center p-4 rounded-lg shadow-md transform transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl"
            style={{ 
              perspective: '1000px',
              background: 'radial-gradient(circle at center, #2d3748, #1a202c)',
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = ((y - centerY) / 30).toFixed(2); // Gentle tilt
              const rotateY = ((x - centerX) / 30).toFixed(2); // Gentle tilt
              const gradientX = ((x / rect.width) * 100).toFixed(2);
              const gradientY = ((y / rect.height) * 100).toFixed(2);
              e.currentTarget.style.transform = `scale(1.05) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
              e.currentTarget.style.boxShadow = `0px 15px 25px rgba(0, 0, 0, 0.25), ${rotateY}px ${-rotateX}px 30px rgba(0, 0, 0, 0.2)`;
              e.currentTarget.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, #1f2937, #111827)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotateX(0) rotateY(0)';
              e.currentTarget.style.boxShadow = '0px 10px 20px rgba(0, 0, 0, 0.25)';
              e.currentTarget.style.background = 'radial-gradient(circle at center, #1f2937, #111827)';
            }}
          >
            <div className="relative w-20 h-20">
              <Image
                src={contributor.avatar_url}
                alt={contributor.login}
                className="rounded-full border-2 border-blue-500"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <a
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-lg text-white font-medium hover:text-blue-400"
            >
              {contributor.login}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contributors;
