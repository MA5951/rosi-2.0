"use server"

import { prisma } from '@/db/index';

export async function addArticle(data: {
    title: string,
    author: string,
    phone: string,
    status: string,
    description: string,
    subject: string,
    photo: string,
    tags: string,
    teamnumber: string,
    link: string,
    language: string
}) {
    try {
        const processedTags = data.tags.replace(/\s*,\s*/g, ',');
        
        const newArticle = await prisma.articles.create({
            data: {
                ...data,
                tags: processedTags
            }
        });
        return newArticle;
    } catch (error) {
        console.error("Error adding article: ", error);
        throw new Error("Error adding article");
    } finally {
        await prisma.$disconnect();
    }
}
