import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './popup.css';

interface Contact {
  name: string;
  phone: string;
}

interface PopupProps {
  title: string;
  link: string;
  language: string;
  description: string;
  contact: Contact;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ title, link, contact, description, language, onClose }) => {
  const [showIframe, setShowIframe] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

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
      // Fallback for browsers that do not support the Web Share API
      alert(`Share this URL: ${shareUrl}`);
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
      {language === "english" && (
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
          </div>
          {showIframe && (
            <div className="iframe-container mt-4">
              <iframe src={link} className="w-full h-64 border rounded"></iframe>
            </div>
          )}
          <div className="mt-4">
            <p className="font-semibold text-gray-700 dark:text-gray-300">Contact Information:</p>
            <p className="text-gray-700 dark:text-gray-300">Name: {contact.name}</p>
            <p className="text-gray-700 dark:text-gray-300">Contact: {contact.phone}</p>
          </div>
          <button
            onClick={onClose}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
          >
            Close
          </button>
        </motion.div>
      )}
      {language === "hebrew" && (
        <motion.div
          ref={popupRef}
          className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg max-w-md w-full"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <div dir={"rtl"}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">{description}</h4>
            <div className="flex mb-4">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors">
                  פתח מקור
                </button>
              </a>
              <button
                onClick={toggleIframe}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors mx-4"
              > 
                תצוגה מקדימה
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition-colors"
              >
                שתף
              </button>
            </div>
            {showIframe && (
              <div className="iframe-container mt-4">
                <iframe src={link} className="w-full h-64 border rounded"></iframe>
              </div>
            )}
            <div className="mt-4">
              <p className="font-semibold text-gray-700 dark:text-gray-300">פרטי קשר:</p>
              <p className="text-gray-700 dark:text-gray-300">שם: {contact.name}</p>
              <p className="text-gray-700 dark:text-gray-300">יצירת קשר: {contact.phone}</p>
            </div>
            <button
              onClick={onClose}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Popup;