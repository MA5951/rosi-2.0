"use client"

import { useEffect, useState } from 'react';

const articles = [
  {
    title: "how to turn a team?",
    photo: "https://i.ibb.co/RjSPygV/3.png",
    team_num: "5987"
  },
  {
    title: "robot code",
    photo: "https://i.ibb.co/m8L87pj/1657.png",
    team_num: "1657"
  },
  {
    title: "start a community",
    photo: "https://i.ibb.co/Ph11N12/1577.png",
    team_num: "1577"
  },
  {
    title: "reobot planning",
    photo: "https://i.ibb.co/tDhgjx7/3339.png",
    team_num: "3339"
  },
  {
    title: "how to PID?",
    photo: "https://i.ibb.co/GF508qY/3.png",
    team_num: "5951"
  },
  {
    title: "agile work guide",
    photo: "https://i.ibb.co/JqzcZvj/first.png",
    team_num: "first"
  },
  {
    title: "wpilib explenation",
    photo: "https://i.ibb.co/LZSDSKm/3388.png",
    team_num: "3388"
  },
  {
    title: "project managment",
    photo: "https://i.ibb.co/kGK2kqk/image.png",
    team_num: ""
  }
]

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

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
    <main className="flex flex-col items-center min-h-screen bg-blue-50 dark:bg-slate-900 text-gray-900 dark:text-white">
      <div className="bottom-text-container z-10 w-full max-w-5xl flex justify-center items-center text-3xl" style={{marginTop: "17vh", marginBottom: "5vh"}}>
        <p className="bottom-text text-center">
          {articles.length === 0 ? "" : "חקור את האתר"} 
        </p>
      </div>
      <div className="articles-container z-10 w-full max-w-5xl mt-8 px-4 flex flex-wrap justify-center items-center gap-6">
        {articles.map((article, index) => (
          <div className={isMobile ? "article-card-mobile p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md" : "article-card p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"} key={index}>
            <div className="image-container">
              <img
                src={article.photo}
                alt={article.team_num}
                className="w-full h-full object-contain rounded-t-lg"
              />
            </div>
            <div className="p-2 text-center">
              <p className="font-semibold article-title">{article.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bottom-text-container z-10 w-full max-w-5xl flex justify-center items-center text-xl" style={{marginTop: "10vh", marginBottom: "10vh"}}>
        <p className="bottom-text text-center">
          {articles.length === 0 ? "לא נמצאו כתבות" : "לא נמצאו עוד כתבות"}
        </p>
      </div>
    </main>
  );
}
