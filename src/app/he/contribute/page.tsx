"use client"

import { useState, useEffect } from 'react';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    setIsDarkMode(isDark);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-blue-50 dark:bg-slate-900 text-gray-900 dark:text-white">
      <iframe 
        src="https://docs.google.com/forms/d/e/1FAIpQLScxLoXRRI_9yuyBvwb9VYiopA-h7_5qVA6ClBU4HjPOuKL-oA/viewform" 
        style={{height: "80vh", width: "40vw", marginTop: "10vh", borderRadius: "20px", boxShadow: isDarkMode ? "0 3px 50px rgb(255 255 255 / 0.4)" : "0 3px 50px rgb(0 0 0 / 0.4)"}}
      />
    </div>
  );
}
