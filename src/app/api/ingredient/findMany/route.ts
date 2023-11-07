import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export const POST = async () => {
    try {
        const ingredients = await prisma.ingredients.findMany({
            orderBy: {
                name: 'asc'
            },
        })
        return NextResponse.json(ingredients)
    } catch (error) {
        return NextResponse.json({ msg: 'Error' })
    }
}