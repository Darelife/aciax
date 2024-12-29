import React from 'react';

type NavProps = {
  text: string;
  onLogout?: () => void; // Optional logout handler
  checklist?: string;
};

export default function Nav({ text, onLogout, checklist }: NavProps) {
  return (
    <nav className="flex items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 shadow-lg">
      <div className="text-green-500 font-mono text-2xl font-bold">
        <a href="./" className="hover:text-green-400 transition-colors duration-300">
          {text}
        </a>
      </div>
      {onLogout && (
        <button
          onClick={onLogout}
          className="px-4 py-2 text-white font-medium bg-red-500 rounded-lg shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          Logout
        </button>
      )}
      {checklist && (
        <button
          className="px-4 py-2 text-white font-medium bg-red-500 rounded-lg shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <a href={checklist}>Checklist</a>
        </button>
      )}

    </nav>
  );
}
