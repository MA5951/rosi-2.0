"use client"

import { useState, useEffect } from 'react';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-blue-50 dark:bg-slate-900 text-gray-900 dark:text-white">
      <style jsx>{`
        @keyframes skeleton-gradient-light {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes skeleton-gradient-dark {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .skeleton-background-light {
          background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: skeleton-gradient-light 1.5s infinite;
        }

        .skeleton-background-dark {
          background: linear-gradient(90deg, #3a3a3a 25%, #4a4a4a 50%, #3a3a3a 75%);
          background-size: 200% 100%;
          animation: skeleton-gradient-dark 1.5s infinite;
        }
      `}</style>
      <iframe 
        src="https://docs.google.com/forms/d/e/1FAIpQLScxLoXRRI_9yuyBvwb9VYiopA-h7_5qVA6ClBU4HjPOuKL-oA/viewform"
        className={isDarkMode ? 'skeleton-background-dark' : 'skeleton-background-light'}
        style={{height: isMobile ? "70vh" : "80vh", width: isMobile ? "80vw" : "40vw", marginTop: "15vh", borderRadius: "20px", boxShadow: isDarkMode ? "0 3px 50px rgb(255 255 255 / 0.4)" : "0 3px 50px rgb(0 0 0 / 0.4)"}}
      />
    </div>
  );
}
