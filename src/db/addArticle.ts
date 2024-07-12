"use server"

import { prisma } from '@/db/index';

export async function addArticle(data: {
    title: string,
    author: string,
    phone: string,
    description: string,
    subject: string,
    photo: string,
    link: string,
    language: string
}) {
    try {
        const newArticle = await prisma.articles.create({
            data
        });
        return newArticle;
    } catch (error) {
        console.error("Error adding article: ", error);
        throw new Error("Error adding article");
    } finally {
        await prisma.$disconnect();
    }
}
