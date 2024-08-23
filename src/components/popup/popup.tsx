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
  const [showIframe, setShowIframe] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  let tagsArr = tags.split(',');
  tagsArr = tagsArr.map(tag => tag.trim());

  useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]') as string[];
    setIsFavorite(favoriteIds.includes(id));
  }, [id]);

  const toggleIframe = () => {
    setShowIframe(!showIframe);
  };

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
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors">
                Open Source
              </button>
            </a>
            <button
              onClick={toggleIframe}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Preview
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition-colors"
            >
              Share
            </button>
            <button
              onClick={handleFavoriteToggle}
              className={`px-4 py-2 rounded transition-colors ${isFavorite ? 'bg-red-500 hover:bg-red-700' : 'bg-gray-500 hover:bg-gray-700'} text-white`}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
          {showIframe && (
            <div className="iframe-container mt-4">
              <iframe src={link} className="w-full h-64 border rounded"></iframe>
            </div>
          )}
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
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
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
            <a href={link} target="_blank" rel="noopener noreferrer" className='ml-4'>
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors">
                פתח מקור
              </button>
            </a>
            <button
              onClick={toggleIframe}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
            >
              תצוגה מקדימה
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition-colors"
            >
              שתף
            </button>
            <button
              onClick={handleFavoriteToggle}
              className={`px-4 py-2 rounded transition-colors ${isFavorite ? 'bg-red-500 hover:bg-red-700' : 'bg-gray-500 hover:bg-gray-700'} text-white`}
            >
              {isFavorite ? 'הסר מהמועדפים' : 'הוסף למעודפים'}
            </button>
          </div>
          {showIframe && (
            <div className="iframe-container mt-4">
              <iframe src={link} className="w-full h-64 border rounded"></iframe>
            </div>
          )}
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
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
          >
            סגור
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Popup;
