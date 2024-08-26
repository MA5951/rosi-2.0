import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './popup.css';

interface Contact {
  name: string;
  phone: string;
}

interface PopupProps {
  id: string;
  title: string;
  link: string;
  language: string;
  description: string;
  teamnumber: string;
  tags: string; // list of tags separated by commas
  contact: Contact;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ id, title, link, contact, teamnumber, description, language, tags, onClose }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  let tagsArr = tags.split(',');
  tagsArr = tagsArr.map(tag => tag.trim());

  useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]') as string[];
    setIsFavorite(favoriteIds.includes(id));
  }, [id]);

  const handleShare = () => {
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/${language === 'hebrew' ? 'he' : 'en'}/search/${encodeURIComponent(title)}`;
    if (navigator.share) {
      navigator.share({
        title: 'Check out this article',
        url: shareUrl,
      }).catch(console.error);
    } else {
      alert(`Share this URL: ${shareUrl}`);
    }
  };

  const handleFavoriteToggle = () => {
    const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]') as string[];

    if (isFavorite) {
      const updatedFavorites = favoriteIds.filter(favId => favId !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favoriteIds.push(id);
      localStorage.setItem('favorites', JSON.stringify(favoriteIds));
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      { language === 'english' ? (
        <motion.div
          ref={popupRef}
          className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg max-w-md w-full"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
          <h4 className="font-bold mb-4 text-gray-900 dark:text-white">{description}</h4>
          <div className="flex space-x-4 mb-4">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <button className="text-white bg-gradient-to-br from-green-500 to-blue-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-6 py-3 transition duration-200 ease-in-out transform hover:scale-105 shadow-md">
              Open Source
            </button>
          </a>

          <button
            onClick={handleFavoriteToggle}
            className={`text-white bg-gradient-to-br ${isFavorite ? 'from-red-600 to-red-700 hover:bg-gradient-to-bl focus:ring-red-300' : 'from-yellow-700 to-amber-400 hover:bg-gradient-to-bl focus:ring-gray-300'} font-medium rounded-lg text-sm px-6 py-3 transition duration-200 ease-in-out transform hover:scale-105 shadow-md`}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>

          <button
            onClick={handleShare}
            className="text-white bg-gradient-to-br from-pink-500 to-orange-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-6 py-3 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
          >
            Share
          </button>
          </div>
          <div className="mt-4">
            <p className="font-semibold text-gray-700 dark:text-gray-300">Contact Information:</p>
            <p className="text-gray-700 dark:text-gray-300">Team: {teamnumber}</p>
            <p className="text-gray-700 dark:text-gray-300">Name: {contact.name}</p>
            <p className="text-gray-700 dark:text-gray-300">Contact: {contact.phone}</p>
          </div>
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {tagsArr.map((tag, index) => (
                <div key={index} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="mt-6 text-white bg-gradient-to-br from-red-500 to-red-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-6 py-3 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
          >
            Close
          </button>
        </motion.div>
      ) : (
        <motion.div
          ref={popupRef}
          className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg max-w-md w-full"
          dir="rtl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
          <h4 className="font-bold mb-4 text-gray-900 dark:text-white">{description}</h4>
          <div className="flex space-x-4 mb-4">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <button className="ml-4 text-white bg-gradient-to-br from-green-500 to-blue-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-6 py-3 transition duration-200 ease-in-out transform hover:scale-105 shadow-md">
                פתח מקור
              </button>
            </a>

            <button
              onClick={handleFavoriteToggle}
              className={`text-white bg-gradient-to-br ${isFavorite ? 'from-red-600 to-red-700 hover:bg-gradient-to-bl focus:ring-red-300' : 'from-yellow-700 to-amber-400 hover:bg-gradient-to-bl focus:ring-gray-300'} font-medium rounded-lg text-sm px-6 py-3 transition duration-200 ease-in-out transform hover:scale-105 shadow-md`}
            >
              {isFavorite ? 'הסרה מהמועדפים' : 'הוספה למועדפים'}
            </button>

            <button
              onClick={handleShare}
              className="text-white bg-gradient-to-br from-pink-500 to-orange-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-6 py-3 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
            >
              שתף
            </button>
          </div>
          <div className="mt-4">
            <p className="font-semibold text-gray-700 dark:text-gray-300">פרטי מחבר</p>
            <p className="text-gray-700 dark:text-gray-300">קבוצה: {teamnumber}</p>
            <p className="text-gray-700 dark:text-gray-300">שם: {contact.name}</p>
            <p className="text-gray-700 dark:text-gray-300">דרך קשר: {contact.phone}</p>
          </div>
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {tagsArr.map((tag, index) => (
                <div key={index} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="mt-6 text-white bg-gradient-to-br from-red-500 to-red-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-6 py-3 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
          >
            סגור
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Popup;
