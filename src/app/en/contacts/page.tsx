"use client";

import { useEffect, useState } from 'react';
import { getAllContacts } from '@/db/server';

interface Contact {
    author: string;
    phone: string;
    teamnumber: string;
    country: string;
}

const ContactsPage: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Contact | null, direction: 'ascending' | 'descending' | null }>({ key: null, direction: null });

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const fetchedContacts = await getAllContacts('english', 'approved');
                const validatedContacts = validateAndDeduplicateContacts(fetchedContacts);
                setContacts(validatedContacts);
            } catch (error) {
                console.error('Error fetching contacts:', error);
                setError('Failed to load contacts.');
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    const normalizePhoneNumber = (phone: string) => {
        return phone.replace(/\D/g, ''); // Remove all non-numeric characters
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return emailRegex.test(email);
    };

    const normalizeName = (name: string) => {
        return name.trim().toLowerCase(); // Trim whitespace and convert to lowercase
    };

    const getNormalizedContact = (contact: string) => {
        return isValidEmail(contact) ? contact : normalizePhoneNumber(contact);
    };

    const validateAndDeduplicateContacts = (contacts: Contact[]) => {
        const seen = new Map<string, Contact>();

        contacts.forEach(contact => {
            const normalizedAuthor = normalizeName(contact.author);
            const normalizedPhone = getNormalizedContact(contact.phone);

            // Ensure neither the author nor the phone is empty after normalization
            if (normalizedAuthor && normalizedPhone) {
                const key = `${normalizedAuthor}-${normalizedPhone}`;
                if (!seen.has(key)) {
                    seen.set(key, contact);
                }
            }
        });

        return Array.from(seen.values());
    };

    const sortedContacts = [...contacts].sort((a, b) => {
        if (sortConfig.key) {
            let directionMultiplier = sortConfig.direction === 'ascending' ? 1 : -1;
            const aValue = sortConfig.key === 'phone' ? getNormalizedContact(a[sortConfig.key]) : a[sortConfig.key];
            const bValue = sortConfig.key === 'phone' ? getNormalizedContact(b[sortConfig.key]) : b[sortConfig.key];

            if (aValue < bValue) {
                return -1 * directionMultiplier;
            }
            if (aValue > bValue) {
                return 1 * directionMultiplier;
            }
        }
        return 0;
    });

    const requestSort = (key: keyof Contact) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key: keyof Contact) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending' ? '↑' : '↓';
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-blue-50 dark:bg-slate-900 text-gray-900 dark:text-white p-4">
                <div className="w-full max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-center">Contacts</h2>
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                            <thead>
                                <tr>
                                    <th className="border-b border-gray-300 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-left font-bold text-gray-700 dark:text-gray-300">
                                        No.
                                    </th>
                                    <th className="border-b border-gray-300 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-left font-bold text-gray-700 dark:text-gray-300">
                                        Name
                                    </th>
                                    <th className="border-b border-gray-300 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-left font-bold text-gray-700 dark:text-gray-300">
                                        Phone / Email
                                    </th>
                                    <th className="border-b border-gray-300 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-left font-bold text-gray-700 dark:text-gray-300">
                                        Team Number
                                    </th>
                                    <th className="border-b border-gray-300 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-left font-bold text-gray-700 dark:text-gray-300">
                                        Country
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <tr key={index} className={`hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}>
                                        <td className="border-b border-gray-300 px-6 py-4">
                                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                                        </td>
                                        <td className="border-b border-gray-300 px-6 py-4">
                                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                                        </td>
                                        <td className="border-b border-gray-300 px-6 py-4">
                                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                                        </td>
                                        <td className="border-b border-gray-300 px-6 py-4">
                                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                                        </td>
                                        <td className="border-b border-gray-300 px-6 py-4">
                                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-50 dark:bg-slate-900 text-gray-900 dark:text-white p-4">
            <div className="mt-20 w-full max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">Contacts</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                        <thead>
                            <tr>
                                <th
                                    className="border-b border-gray-300 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-left font-bold text-gray-700 dark:text-gray-300 cursor-pointer"
                                    onClick={() => requestSort('author')}
                                >
                                    No.
                                </th>
                                <th
                                    className="border-b border-gray-300 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-left font-bold text-gray-700 dark:text-gray-300 cursor-pointer"
                                    onClick={() => requestSort('author')}
                                >
                                    Name {getSortIndicator('author')}
                                </th>
                                <th
                                    className="border-b border-gray-300 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-left font-bold text-gray-700 dark:text-gray-300 cursor-pointer"
                                    onClick={() => requestSort('phone')}
                                >
                                    Phone / Email {getSortIndicator('phone')}
                                </th>
                                <th
                                    className="border-b border-gray-300 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-left font-bold text-gray-700 dark:text-gray-300 cursor-pointer"
                                    onClick={() => requestSort('teamnumber')}
                                >
                                    Team Number {getSortIndicator('teamnumber')}
                                </th>
                                <th
                                    className="border-b border-gray-300 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-left font-bold text-gray-700 dark:text-gray-300 cursor-pointer"
                                    onClick={() => requestSort('country')}
                                >
                                    Country {getSortIndicator('country')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedContacts.map((contact, index) => (
                                <tr
                                    key={index}
                                    className={`hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}
                                >
                                    <td className="border-b border-gray-300 px-6 py-4 text-gray-700 dark:text-gray-300">{index + 1}</td>
                                    <td className="border-b border-gray-300 px-6 py-4 text-gray-700 dark:text-gray-300">{contact.author}</td>
                                    <td className="border-b border-gray-300 px-6 py-4 text-gray-700 dark:text-gray-300">{getNormalizedContact(contact.phone)}</td>
                                    <td className="border-b border-gray-300 px-6 py-4 text-gray-700 dark:text-gray-300">{contact.teamnumber}</td>
                                    <td className="border-b border-gray-300 px-6 py-4 text-gray-700 dark:text-gray-300">{contact.country}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ContactsPage;
