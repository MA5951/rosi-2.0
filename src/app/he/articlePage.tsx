"use client"

import { useEffect, useState } from 'react';
import Popup from './popup/popup';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllArticles } from '@/db/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface Contact {
  name: string;
  phone: string;
}

interface Article {
  id: string;
  title: string;
  photo: string;
  description: string;
  link: string;
  contact: Contact;
}

interface ArticlePageProps {
  subject: string;
  search: string;
}

const ArticlePage: React.FC<ArticlePageProps> = ({subject, search}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const fetchedArticles = await getAllArticles("hebrew", subject, search);
      const formattedArticles = fetchedArticles.map((article) => ({
        id: article.id,
        title: article.title,
        photo: article.photo,
        description: article.description, 
        link: article.link,
        contact: {
          name: article.author,
          phone: article.phone
        }
      }));
      setArticles(formattedArticles);
      setIsLoading(false);
    };

    fetchArticles();
  }, [subject, search]);

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
      {isLoading && (
        <div className="z-10 w-full max-w-5xl flex justify-center items-center mt-20">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-6xl text-gray-900 dark:text-white" style={{marginTop: "20vh", height: "10vh", width: "10vh" }} />
        </div>
      )}
      {isLoading === false && (
        <div>
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
                    alt={article.description}
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
                description={selectedArticle.description}
                onClose={closePopup} 
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
}

export default ArticlePage;
