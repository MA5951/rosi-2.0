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
            message: `מאמר חדש נוסף:\nכותרת: ${formData.title}\nמחבר: ${formData.author}\nטלפון: ${formData.phone}\nתיאור: ${formData.description}\nנושא: ${formData.subject}\nקישור: ${formData.link}\nשפה: ${formData.language}\nסטטוס: ${formData.status}`
        };

        return emailjs.send(process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID?? "", process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID?? "", emailParams, process.env.NEXT_PUBLIC_EMAIL_USER_ID?? "");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');

        const formDataWithPhoto = { ...formData, photo: "https://i.ibb.co/7WGzjsv/2.png" };

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
                pending: 'מוסיף מאמר...',
                success: 'מאמר נוסף בהצלחה!',
                error: 'נכשל להוסיף מאמר.'
            },
            { theme: 'dark', position: 'top-right' }
        );
    };

    return (
        <div dir="rtl" className="flex min-h-screen flex-col items-center justify-center bg-blue-50 dark:bg-slate-900 text-gray-900 dark:text-white">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
                <h2 style={{marginTop: "15vh"}} className="text-2xl mb-4">הוסף מאמר חדש</h2>
                {['כותרת', 'מחבר', 'טלפון או מייל', 'תיאור', 'קישור'].map((field) => (
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
                        נושא
                    </label>
                    <select
                        name="subject"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">בחר נושא</option>
                        <option value="cad">שרטוט</option>
                        <option value="mechanics">מכניקה</option>
                        <option value="programming">תכנות</option>
                        <option value="manufacturing">ייצור</option>
                        <option value="community">קהילה</option>
                        <option value="electrical">אלקטרוניקה</option>
                        <option value="ftc">FTC</option>
                        <option value="other">אחר</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="language">
                        שפה
                    </label>
                    <select
                        name="language"
                        id="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">בחר שפה</option>
                        <option value="english">אנגלית</option>
                        <option value="hebrew">עברית</option>
                    </select>
                </div>
                {errorMessage && (
                    <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>
                )}
                <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    הוסף מאמר
                </button>
            </form>
        </div>
    );
}

export default AddArticlePage;
