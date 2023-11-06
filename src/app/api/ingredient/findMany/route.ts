import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export const POST = async () => {
    try {
        const ingredients = await prisma.ingredients.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                name: true
            }
        })
        return NextResponse.json(ingredients)
    } catch (error) {
        return NextResponse.json({ msg: 'Error' })
    }
}