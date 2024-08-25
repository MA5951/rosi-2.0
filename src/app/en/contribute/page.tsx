"use client"

import { useState } from 'react';
import emailjs from 'emailjs-com';
import { addArticle } from '@/db/addArticle';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
    title: string;
    author: string;
    phone: string;
    description: string;
    subject: string;
    link: string;
    language: string;
    teamnumber: string;
    tags: string;
    status: string;
}

const AddArticlePage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        author: '',
        phone: '',
        description: '',
        subject: '',
        link: '',
        language: '',
        teamnumber: '',
        tags: '',
        status: 'pending'
    });

    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const sendEmailNotification = async (formData: FormData) => {
        const emailParams = {
            title: formData.title,
            author: formData.author,
            phone: formData.phone,
            description: formData.description,
            subject: formData.subject,
            link: formData.link,
            language: formData.language,
            status: formData.status,
            message: `New article added:\nTitle: ${formData.title}\nAuthor: ${formData.author}\nPhone: ${formData.phone}\nDescription: ${formData.description}\nSubject: ${formData.subject}\nLink: ${formData.link}\nLanguage: ${formData.language}\nStatus: ${formData.status}`
        };

        return emailjs.send(process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID?? "", process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID?? "", emailParams, process.env.NEXT_PUBLIC_EMAIL_USER_ID?? "");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');

        const formDataWithPhoto = { ...formData, photo: "https://i.ibb.co/JqzcZvj/first.png" };

        const promise = addArticle(formDataWithPhoto)
            .then(() => {
                setFormData({
                    title: '',
                    author: '',
                    phone: '',
                    description: '',
                    subject: '',
                    link: '',
                    language: '',
                    teamnumber: '',
                    tags: '',
                    status: 'pending'
                });
                return sendEmailNotification(formDataWithPhoto);
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
                {['title', 'author', 'phone', 'description', 'link'].map((field) => (
                    <div key={field} className="mb-4">
                        <label className="block text-sm font-bold mb-2 dark:text-white" htmlFor={field}>
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            type="text"
                            name={field}
                            id={field}
                            value={formData[field as keyof FormData]} // Cast to keyof FormData
                            onChange={handleChange}
                            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-600 border-0 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                ))}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 dark:text-white" htmlFor="teamnumber">
                        Team number
                    </label>
                    <input
                        type="text"
                        name="teamnumber"
                        id="teamnumber"
                        value={formData.teamnumber}
                        onChange={handleChange}
                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-600 border-0 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 dark:text-white" htmlFor="tags">
                        Tags (separated by commas)
                    </label>
                    <input
                        type="text"
                        name="tags"
                        id="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-600 border-0 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 dark:text-white" htmlFor="subject">
                        Subject
                    </label>
                    <select
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-600 border-0 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
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
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 dark:text-white" htmlFor="language">
                        Language
                    </label>
                    <select
                        name="language"
                        id="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-600 border-0 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select Language</option>
                        <option value="english">English</option>
                        <option value="hebrew">Hebrew</option>
                    </select>
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
