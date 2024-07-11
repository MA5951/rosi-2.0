"use client"

import { useEffect, useState } from 'react';
import Popup from '@/components/popup/popup';
import { motion, AnimatePresence } from 'framer-motion';

interface Contact {
  name: string;
  phone: string;
}

interface Article {
  title: string;
  photo: string;
  team_num: string;
  link: string;
  contact: Contact;
}

const articles: Article[] = [
  {
    title: "how to turn a team?",
    photo: "https://i.ibb.co/RjSPygV/3.png",
    team_num: "5987",
    link: "https://example.com/presentation1",
    contact: {
      name: "John Doe",
      phone: "123-456-7890"
    }
  },
  {
    title: "robot code",
    photo: "https://i.ibb.co/m8L87pj/1657.png",
    team_num: "1657",
    link: "https://example.com/presentation2",
    contact: {
      name: "Jane Smith",
      phone: "987-654-3210"
    }
  },
  {
    title: "start a community",
    photo: "https://i.ibb.co/Ph11N12/1577.png",
    team_num: "1577",
    link: "https://example.com/presentation3",
    contact: {
      name: "Alice Johnson",
      phone: "555-555-5555"
    }
  },
  {
    title: "reobot planning",
    photo: "https://i.ibb.co/tDhgjx7/3339.png",
    team_num: "3339",
    link: "https://example.com/presentation4",
    contact: {
      name: "Bob Brown",
      phone: "444-444-4444"
    }
  },
  {
    title: "how to PID?",
    photo: "https://i.ibb.co/GF508qY/3.png",
    team_num: "5951",
    link: "https://example.com/presentation5",
    contact: {
      name: "Charlie Davis",
      phone: "333-333-3333"
    }
  },
  {
    title: "agile work guide",
    photo: "https://i.ibb.co/JqzcZvj/first.png",
    team_num: "first",
    link: "https://example.com/presentation6",
    contact: {
      name: "Diana Evans",
      phone: "222-222-2222"
    }
  },
  {
    title: "wpilib explenation",
    photo: "https://i.ibb.co/LZSDSKm/3388.png",
    team_num: "3388",
    link: "https://example.com/presentation7",
    contact: {
      name: "Frank Green",
      phone: "111-111-1111"
    }
  },
  {
    title: "project managment",
    photo: "https://i.ibb.co/kGK2kqk/image.png",
    team_num: "",
    link: "https://example.com/presentation8",
    contact: {
      name: "Grace Harris",
      phone: "000-000-0000"
    }
  }
]

const Home: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

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

  const openPopup = (article: Article) => {
    setSelectedArticle(article);
  };

  const closePopup = () => {
    setSelectedArticle(null);
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-blue-50 dark:bg-slate-900 text-gray-900 dark:text-white">
      <div className="bottom-text-container z-10 w-full max-w-5xl flex justify-center items-center text-3xl" style={{marginTop: "17vh", marginBottom: "5vh"}}>
        <p className="bottom-text text-center">
          {articles.length === 0 ? "" : "Explore all resources"} 
        </p>
      </div>
      <div className="articles-container z-10 w-full max-w-5xl mt-8 px-4 flex flex-wrap justify-center items-center gap-6">
        {articles.map((article, index) => (
          <motion.div 
            className={isMobile ? "article-card-mobile p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md" : "article-card p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"} 
            key={index}
            onClick={() => openPopup(article)}
            style={{ cursor: 'pointer' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
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
          </motion.div>
        ))}
      </div>
      <div className="bottom-text-container z-10 w-full max-w-5xl flex justify-center items-center text-xl" style={{marginTop: "10vh", marginBottom: "10vh"}}>
        <p className="bottom-text text-center">
          {articles.length === 0 ? "No articles found" : "No more articles found"}
        </p>
      </div>
      <AnimatePresence>
        {selectedArticle && (
          <Popup 
            title={selectedArticle.title} 
            link={selectedArticle.link} 
            contact={selectedArticle.contact} 
            onClose={closePopup} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}

export default Home;