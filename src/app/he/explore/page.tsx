"use client"

import { useEffect, useState } from 'react';
import Popup from '../popup/popup';
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
    title: "איך להפוך קבוצה למולחת",
    photo: "https://i.ibb.co/RjSPygV/3.png",
    team_num: "5987",
    link: "https://docs.google.com/presentation/d/e/2PACX-1vTDkqbX56DuBajY5HXBq9jQtyFjOFbtoASoIAJxN0OJqOL4TzlkBCjKnbbXZFCJjnZRm9MlH7DfS6Ln/embed?start=false&loop=false&delayms=60000",
    contact: {
      name: "יודע לא",
      phone: "123-456-7890"
    }
  },
  {
    title: "קוד רובוט",
    photo: "https://i.ibb.co/m8L87pj/1657.png",
    team_num: "1657",
    link: "https://example.com/",
    contact: {
      name: "מייזנר אסף",
      phone: "987-654-3210"
    }
  },
  {
    title: "להתחיל קהבילה",
    photo: "https://i.ibb.co/Ph11N12/1577.png",
    team_num: "1577",
    link: "https://example.com/",
    contact: {
      name: "מישהו סתם",
      phone: "555-555-5555"
    }
  },
  {
    title: "תכנון רובוט",
    photo: "https://i.ibb.co/tDhgjx7/3339.png",
    team_num: "3339",
    link: "https://example.com/",
    contact: {
      name: "אחד איש",
      phone: "444-444-4444"
    }
  },
  {
    title: "מדריך PID",
    photo: "https://i.ibb.co/GF508qY/3.png",
    team_num: "5951",
    link: "https://example.com/",
    contact: {
      name: "איש שתיים",
      phone: "333-333-3333"
    }
  },
  {
    title: "עבודה אגילית",
    photo: "https://i.ibb.co/JqzcZvj/first.png",
    team_num: "first",
    link: "https://example.com/",
    contact: {
      name: "איש שלוש",
      phone: "222-222-2222"
    }
  },
  {
    title: "הסבר על WPILIB",
    photo: "https://i.ibb.co/LZSDSKm/3388.png",
    team_num: "3388",
    link: "https://example.com/",
    contact: {
      name: "לא יודע",
      phone: "111-111-1111"
    }
  },
  {
    title: "ניהול פרוייקטים",
    photo: "https://i.ibb.co/kGK2kqk/image.png",
    team_num: "",
    link: "https://example.com/",
    contact: {
      name: "שאלה טובה",
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
    <main dir="rtl" className="flex flex-col items-center min-h-screen bg-blue-50 dark:bg-slate-900 text-gray-900 dark:text-white">
      <div className="bottom-text-container z-10 w-full max-w-5xl flex justify-center items-center text-3xl" style={{marginTop: "17vh", marginBottom: "5vh"}}>
        <p className="bottom-text text-center">
          {articles.length === 0 ? "" : "חקור את האתר"} 
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
          {articles.length === 0 ? "לא נמצאו כתבות" : "לא נמצאו עוד כתבות"}
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