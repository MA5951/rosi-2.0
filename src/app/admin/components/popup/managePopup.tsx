"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './popup.css';
import { updateArticleAuthorEnglish, updateArticleStatus, updateArticlePhoto, updateArticleLink, updateArticleDescription, updateArticleAuthor, deleteArticle, updateArticleSubject, updateArticleTags, updateArticleTeamNumber } from '@/db/server';

interface Contact {
  name: string;
  phone: string;
}

interface PopupProps {
  title: string;
  link: string;
  language: string;
  description: string;
  tags: string; // list of tags separated by commas
  teamnumber: string;
  authorEnglish: string;
  contact: Contact;
  onClose: () => void;
  articleId: string;
}

const Popup: React.FC<PopupProps> = ({ title, link, contact, description, tags, teamnumber, language, onClose, articleId, authorEnglish }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [password, setPassword] = useState('');
  const [newValue, setNewValue] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('status');

  // convert tags string to array
  let tagsArr = tags.split(',');
  tagsArr = tagsArr.map(tag => tag.trim());

  const handleApprove = async () => {
    if (password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      alert('Incorrect password.');
      return;
    }

    setIsUpdating(true);
    try {
      switch (selectedProperty) {
        case 'status':
          await updateArticleStatus(articleId, newValue);
          break;
        case 'photo':
          await updateArticlePhoto(articleId, newValue);
          break;
        case 'link':
          await updateArticleLink(articleId, newValue);
          break;
        case 'description':
          await updateArticleDescription(articleId, newValue);
          break;
        case 'author':
          await updateArticleAuthor(articleId, newValue);
          break;
        case 'subject':
          await updateArticleSubject(articleId, newValue);
          break;
        case 'tags':
          await updateArticleTags(articleId, newValue);
          break;
        case 'teamnumber':
          await updateArticleTeamNumber(articleId, newValue);
          break;
        case 'authorEnglish':
          await updateArticleAuthorEnglish(articleId, newValue);
          break;
        default:
          throw new Error('Invalid property selected');
      }
      alert('Article updated successfully!');
      window.location.reload(); // Full page reload
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Failed to update article.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      alert('Incorrect password.');
      return;
    }

    setIsDeleting(true);
    try {
      await deleteArticle(articleId);
      alert('Article deleted successfully!');
      window.location.reload(); // Full page reload
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
              <button className="text-white bg-gradient-to-br from-green-500 to-blue-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-6 py-3 transition duration-200 ease-in-out transform hover:scale-105 shadow-md">
                Open Source
              </button>
            </a>
          </div>
          <div className="mt-4">
            <p className="font-semibold text-gray-700 dark:text-gray-300">Contact Information:</p>
            <p className="text-gray-700 dark:text-gray-300">Team: {teamnumber}</p>
            <p className="text-gray-700 dark:text-gray-300">Name: {contact.name}</p>
            <p className="text-gray-700 dark:text-gray-300">English name: {authorEnglish}</p>
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
          <div className="mt-4">
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="px-4 py-2 border rounded w-full text-gray-700"
            >
              <option value="status">Status</option>
              <option value="photo">Photo</option>
              <option value="link">Link</option>
              <option value="description">Description</option>
              <option value="author">Author</option>
              <option value="authorEnglish">Author English</option>
              <option value="subject">Subject</option>
              <option value="tags">Tags</option>
              <option value="teamnumber">Team Number</option>
            </select>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder={`Enter new ${selectedProperty}`}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="px-4 py-2 border rounded w-full text-gray-700"
            />
          </div>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleApprove}
              className="mt-6 text-white bg-gradient-to-br from-green-500 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-3 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
              disabled={isUpdating || isDeleting}
            >
              {isUpdating ? 'Approving...' : 'Approve'}
            </button>
            <button
              onClick={handleDelete}
              className="mt-6 text-white bg-gradient-to-br from-red-500 to-red-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-6 py-3 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
              disabled={isUpdating || isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
            <button
              onClick={onClose}
              className="mt-6 text-white bg-gradient-to-br from-gray-500 to-gray-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-3 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
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
          dir="rtl"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
          <h4 className="font-bold mb-4 text-gray-900 dark:text-white">{description}</h4>
          <div className="flex mb-4">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <button className="ml-4 text-white bg-gradient-to-br from-green-500 to-blue-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-6 py-3 transition duration-200 ease-in-out transform hover:scale-105 shadow-md">
                פתח מקור
              </button>
            </a>
          </div>
          <div className="mt-4">
            <p className="font-semibold text-gray-700 dark:text-gray-300">פרטי קשר:</p>
            <p className="text-gray-700 dark:text-gray-300">קבוצה: {teamnumber}</p>
            <p className="text-gray-700 dark:text-gray-300">שם: {contact.name}</p>
            <p className="text-gray-700 dark:text-gray-300">שם באנגלית: {authorEnglish}</p>
            <p className="text-gray-700 dark:text-gray-300">דרך קשר: {contact.phone}</p>
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
          <div className="mt-4">
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="px-4 py-2 border rounded w-full text-gray-700"
            >
              <option value="status">סטטוס</option>
              <option value="photo">תמונה</option>
              <option value="link">קישור</option>
              <option value="description">תיאור</option>
              <option value="author">מחבר</option>
              <option value="authorEnglish">מחבר באנגלית</option>
              <option value="subject">נושא</option>
              <option value="tags">תגים</option>
              <option value="teamnumber">מספר קבוצה</option>
            </select>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder={`הזן ${selectedProperty} חדש`}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="px-4 py-2 border rounded w-full text-gray-700"
            />
          </div>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleApprove}
              className="mt-6 text-white bg-gradient-to-br from-green-500 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-3 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
              disabled={isUpdating || isDeleting}
            >
              {isUpdating ? 'מאשר...' : 'אשר'}
            </button>
            <button
              onClick={handleDelete}
              className="mt-6 text-white bg-gradient-to-br from-red-500 to-red-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-6 py-3 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
              disabled={isUpdating || isDeleting}
            >
              {isDeleting ? 'מוחק...' : 'מחק'}
            </button>
            <button
              onClick={onClose}
              className="mt-6 text-white bg-gradient-to-br from-gray-500 to-gray-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-3 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
            >
              סגור
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Popup;
