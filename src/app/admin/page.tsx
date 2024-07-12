"use client"

import { useState } from 'react';
import { addArticle } from '@/db/addArticle';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
    title: string;
    author: string;
    phone: string;
    description: string;
    subject: string;
    photo: string;
    link: string;
    language: string;
}

const AddArticlePage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        author: '',
        phone: '',
        description: '',
        subject: '',
        photo: '',
        link: '',
        language: ''
    });

    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== 'team5951') {
            setErrorMessage('Invalid password');
            return;
        }
        setErrorMessage('');

        const promise = addArticle(formData)
            .then(() => {
                setFormData({
                    title: '',
                    author: '',
                    phone: '',
                    description: '',
                    subject: '',
                    photo: '',
                    link: '',
                    language: ''
                });
                setPassword('');
            })
            .catch((error) => {
                console.error('Failed to add article:', error);
                throw new Error('Failed to add article');
            });

        toast.promise(
            promise,
            {
                pending: 'Adding article...',
                success: 'Article added successfully!',
                error: 'Failed to add article.'
            },
            { theme: 'dark', position: 'top-right' }
        );
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-blue-50 dark:bg-slate-900 text-gray-900 dark:text-white">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
                <h2 style={{marginTop: "15vh"}} className="text-2xl mb-4">Add New Article</h2>
                {['title', 'author', 'phone', 'description', 'photo', 'link'].map((field) => (
                    <div key={field} className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor={field}>
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            type="text"
                            name={field}
                            id={field}
                            value={formData[field as keyof FormData]} // Cast to keyof FormData
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                ))}
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="subject">
                        Subject
                    </label>
                    <select
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select Subject</option>
                        <option value="cad">CAD</option>
                        <option value="mechanics">Mechanics</option>
                        <option value="programming">Programming</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="community">Community</option>
                        <option value="electrical">Electrical</option>
                        <option value="ftc">FTC</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="language">
                        Language
                    </label>
                    <select
                        name="language"
                        id="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select Language</option>
                        <option value="english">English</option>
                        <option value="hebrew">Hebrew</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                {errorMessage && (
                    <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>
                )}
                <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Add Article
                </button>
            </form>
        </div>
    );
}

export default AddArticlePage;
