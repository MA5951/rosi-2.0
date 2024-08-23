"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './popup.css';
import { updateArticleStatus, updateArticlePhoto, updateArticleLink, updateArticleDescription, updateArticleAuthor, deleteArticle, updateArticleSubject, updateArticleTags, updateArticleTeamNumber } from '@/db/server';

interface Contact {
  name: string;
  phone: string;
}

interface PopupProps {
  title: string;
  link: string;
  language: string;
  description: string;
  tags: string; // list of tags seperated by comma
  teamnumber: string;
  contact: Contact;
  onClose: () => void;
  articleId: string;
}

const Popup: React.FC<PopupProps> = ({ title, link, contact, description, tags, teamnumber, language, onClose, articleId }) => {
  const [showIframe, setShowIframe] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [password, setPassword] = useState('');
  const [newValue, setNewValue] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('status');

  // convert tags string to array
  let tagsArr = tags.split(',');
  tagsArr = tagsArr.map(tag => tag.trim());
  
  const toggleIframe = () => {
    setShowIframe(!showIframe);
  };

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
              {isDeleting ? 'Deleting...' : 'Delete'}
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
                <option value="subject">נושא</option>
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
}

export default Popup;