"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './popup.css';
import { updateArticleStatus, deleteArticle } from '@/db/server'; // Import the functions
import { useRouter } from 'next/navigation'; // Import useRouter

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
  articleId: string; // Add articleId to props
}

const Popup: React.FC<PopupProps> = ({ title, link, contact, description, language, onClose, articleId }) => {
  const router = useRouter(); // Initialize router
  const [showIframe, setShowIframe] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [password, setPassword] = useState('');

  const toggleIframe = () => {
    setShowIframe(!showIframe);
  };

  const handleApprove = async () => {
    if (password !== 'team5951') {
      alert('Incorrect password.');
      return;
    }

    setIsUpdating(true);
    try {
      await updateArticleStatus(articleId, 'approved');
      alert('Article approved successfully!');
      router.refresh(); // Refresh the page
    } catch (error) {
      console.error('Error approving article:', error);
      alert('Failed to approve article.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (password !== 'team5951') {
      alert('Incorrect password.');
      return;
    }

    setIsDeleting(true);
    try {
      await deleteArticle(articleId);
      alert('Article deleted successfully!');
      router.refresh(); // Refresh the page
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Failed to delete article.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {language === "english" && (
        <motion.div
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
          <div className="mt-4">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 border rounded w-full text-gray-700"
            />
          </div>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleApprove}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors"
              disabled={isUpdating || isDeleting}
            >
              {isUpdating ? 'Approving...' : 'Approve'}
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
              disabled={isUpdating || isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Deni'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
      {language === "hebrew" && (
        <motion.div
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
            <div className="mt-4">
              <input
                type="password"
                placeholder="הזן סיסמה"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 border rounded w-full text-gray-700"
              />
            </div>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors"
                disabled={isUpdating || isDeleting}
              >
                {isUpdating ? 'מאשר...' : 'אשר'}
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
                disabled={isUpdating || isDeleting}
              >
                {isDeleting ? 'מוחק...' : 'מחק'}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition-colors"
              >
                סגור
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Popup;
