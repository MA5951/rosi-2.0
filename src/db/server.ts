"use server"

import { prisma } from '@/db/index';
import axios from 'axios';

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

export async function updateArticleLink(articleId: string, newLink: string) {
    try {
        const updatedArticle = await prisma.articles.update({
            where: { id: articleId },
            data: { link: newLink }
        });
        return updatedArticle;
    } catch (error) {
        console.error("Error updating article link: ", error);
        throw new Error("Error updating article link");
    } finally {
        await prisma.$disconnect();
    }
}

export async function updateArticleDescription(articleId: string, newDescription: string) {
    try {
        const updatedArticle = await prisma.articles.update({
            where: { id: articleId },
            data: { description: newDescription }
        });
        return updatedArticle;
    } catch (error) {
        console.error("Error updating article description: ", error);
        throw new Error("Error updating article description");
    } finally {
        await prisma.$disconnect();
    }
}

export async function updateArticleTags(articleId: string, newTags: string) {
    try {
        const updatedArticle = await prisma.articles.update({
            where: { id: articleId },
            data: { tags: newTags }
        });
        return updatedArticle;
    } catch (error) {
        console.error("Error updating article tags: ", error);
        throw new Error("Error updating article tags");
    } finally {
        await prisma.$disconnect();
    }
}

export async function updateArticleTeamNumber(articleId: string, newTeamNumber: string) {
    try {
        const updatedArticle = await prisma.articles.update({
            where: { id: articleId },
            data: { teamnumber: newTeamNumber }
        });
        return updatedArticle;
    } catch (error) {
        console.error("Error updating article team number: ", error);
        throw new Error("Error updating article team number");
    } finally {
        await prisma.$disconnect();
    }
}

export async function updateArticleAuthor(articleId: string, newAuthor: string) {
    try {
        const updatedArticle = await prisma.articles.update({
            where: { id: articleId },
            data: { author: newAuthor }
        });
        return updatedArticle;
    } catch (error) {
        console.error("Error updating article author: ", error);
        throw new Error("Error updating article author");
    } finally {
        await prisma.$disconnect();
    }
}

export async function updateArticlePhone(articleId: string, newPhone: string) {
    try {
        const updatedArticle = await prisma.articles.update({
            where: { id: articleId },
            data: { phone: newPhone }
        });
        return updatedArticle;
    } catch (error) {
        console.error("Error updating article phone: ", error);
        throw new Error("Error updating article phone");
    } finally {
        await prisma.$disconnect();
    }
}

export async function updateArticleSubject(articleId: string, newSubject: string) {
    try {
        const updatedArticle = await prisma.articles.update({
            where: { id: articleId },
            data: { subject: newSubject }
        });
        return updatedArticle;
    } catch (error) {
        console.error("Error updating article subject: ", error);
        throw new Error("Error updating article subject");
    } finally {
        await prisma.$disconnect();
    }
}

export async function updateArticleTitle(articleId: string, newTitle: string) {
    try {
        const updatedArticle = await prisma.articles.update({
            where: { id: articleId },
            data: { title: newTitle }
        });
        return updatedArticle;
    } catch (error) {
        console.error("Error updating article title: ", error);
        throw new Error("Error updating article title");
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
                    { tags: { contains: search, mode: 'insensitive' } },
                    { teamnumber: { contains: search, mode: 'insensitive' } }
                ]
            };
        } else {
            query = {
                language: lang,
                status: status
            }
        }
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
                tags: true,
                teamnumber: true,
                language: true
            }
        });

        return articles;
    } catch (error) {
        console.error("Error fetching articles: ", error);
        throw new Error("Error fetching articles");
    } finally {
        await prisma.$disconnect();
    }
}

export async function getAllContacts(lang: string, status: string) {
    try {
        let query: any = {
            language: lang,
            status: status
        };

        const articles = await prisma.articles.findMany({
            where: query,
            select: {
                author: true,
                phone: true,
                teamnumber: true
            },
            distinct: ['author', 'phone']
        });

        const contactsWithCountry = await Promise.all(
            articles.map(async (contact) => {
                if (contact.teamnumber) {
                    try {
                        const response = await axios.get(`https://www.thebluealliance.com/api/v3/team/frc${contact.teamnumber}`, {
                            headers: {
                                'X-TBA-Auth-Key': process.env.NEXT_PUBLIC_TBA_AUTH_KEY ?? ''
                            }
                        });
                        const { country } = response.data;

                        return {
                            ...contact,
                            country: country || 'Unknown'
                        };
                    } catch (error) {
                        console.error(`Error fetching country for team ${contact.teamnumber}:`, error);
                        return { ...contact, country: 'Unknown' };
                    }
                }
                return { ...contact, country: 'Unknown' };
            })
        );

        return contactsWithCountry;
    } catch (error) {
        console.error("Error fetching contacts: ", error);
        throw new Error("Error fetching contacts");
    } finally {
        await prisma.$disconnect();
    }
}