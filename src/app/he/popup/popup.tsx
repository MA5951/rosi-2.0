import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './popup.css';

interface Contact {
  name: string;
  phone: string;
}

interface PopupProps {
  title: string;
  link: string;
  description: string;
  contact: Contact;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ title, link, contact, description , onClose }) => {
  const [showIframe, setShowIframe] = useState(false);

  const toggleIframe = () => {
    setShowIframe(!showIframe);
  };

  return (
    <div dir="rtl" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
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
        </div>
        {showIframe && (
          <div className="iframe-container mt-4">
            <iframe src={link} className="w-full h-64 border rounded"></iframe>
          </div>
        )}
        <div className="mt-4">
          <p className="font-semibold text-gray-700 dark:text-gray-300">פרטי קשר:</p>
          <p className="text-gray-700 dark:text-gray-300">שם: {contact.name}</p>
          <p className="text-gray-700 dark:text-gray-300">טלפון: {contact.phone}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default Popup;
