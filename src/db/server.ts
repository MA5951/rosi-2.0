"use server"

import { prisma } from '@/db/index';

export async function getAllArticles(lang: String ,subject: string, search: string) {
    try {
        let query: any = {};

        if (subject) {
            query = {
                subject: subject,
                language: lang
            };
        } else if (search) {
            search = decodeURI(search);
            query = {
                language: lang,
                OR: [ 
                    { title: { contains: search, mode: 'insensitive' } },
                    { author: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ]
            };
        } else {
            query = {
                language: lang
            }
        }
        // Fetch articles based on the constructed query
        const articles = await prisma.articles.findMany({
            where: query,
            select: {
                id: true,
                title: true,
                author: true,
                phone: true,
                description: true,
                subject: true,
                photo: true,
                link: true,
                language: true
            }
        });

        // Return the list of articles
        return articles;
    } catch (error) {
        console.error("Error fetching articles: ", error);
        throw new Error("Error fetching articles");
    } finally {
        await prisma.$disconnect();
    }
}
