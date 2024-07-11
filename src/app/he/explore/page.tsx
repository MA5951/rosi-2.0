"use client"

import '../explore/style.css'

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
  return (
    <main className="flex flex-col items-center min-h-screen bg-blue-50 dark:bg-slate-900 text-gray-900 dark:text-white">
      <div className="articles-container z-10 w-full max-w-5xl mt-8 px-4 flex flex-wrap justify-center items-center gap-6" style={{marginTop: "13vh"}}>
        {articles.map((article, index) => (
          <div className="article-card p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md" key={index}>
            <img
              src={article.photo}
              alt={article.team_num}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-2 text-center">
              <p className="font-semibold">{article.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {/* Other content goes here */}
      </div>
    </main>
  );
}
