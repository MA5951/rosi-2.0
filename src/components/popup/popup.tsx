import React from 'react';
import { motion } from 'framer-motion';
import './Popup.css';

interface Contact {
  name: string;
  phone: string;
}

interface PopupProps {
  title: string;
  link: string;
  contact: Contact;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ title, link, contact, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
        <p><a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Open Source</a></p>
        <div className="mt-4">
          <p className="font-semibold text-gray-700 dark:text-gray-300">Contact Information:</p>
          <p className="text-gray-700 dark:text-gray-300">Name: {contact.name}</p>
          <p className="text-gray-700 dark:text-gray-300">Phone: {contact.phone}</p>
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