"use server"

import { prisma } from '@/db/index';

export async function updateArticleStatus(articleId: string, newStatus: string) {
    try {
        const updatedArticle = await prisma.articles.update({
            where: { id: articleId },
            data: { status: newStatus }
        });
        return updatedArticle;
    } catch (error) {
        console.error("Error updating article status: ", error);
        throw new Error("Error updating article status");
    } finally {
        await prisma.$disconnect();
    }
}

export async function updateArticlePhoto(articleId: string, newPhoto: string) {
    try {
        const updatedArticle = await prisma.articles.update({
            where: { id: articleId },
            data: { photo: newPhoto }
        });
        return updatedArticle;
    } catch (error) {
        console.error("Error updating article photo: ", error);
        throw new Error("Error updating article photo");
    } finally {
        await prisma.$disconnect();
    }
}

export async function deleteArticle(articleId: string) {
    try {
        await prisma.articles.delete({
            where: { id: articleId }
        });
    } catch (error) {
        console.error("Error deleting article: ", error);
        throw new Error("Error deleting article");
    } finally {
        await prisma.$disconnect();
    }
}

export async function getAllArticles(lang: String ,subject: string, search: string, status: string) {
    try {
        let query: any = {};

        if (subject) {
            query = {
                subject: subject,
                status: status,
                language: lang
            };
        } else if (search) {
            search = decodeURI(search);
            query = {
                language: lang,
                status: status,
                OR: [ 
                    { title: { contains: search, mode: 'insensitive' } },
                    { author: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ]
            };
        } else {
            query = {
                language: lang,
                status: status
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
