import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json()
        const { username } = data
        const ingredients = await prisma.ingredients.findMany({
            orderBy: {
                name: 'asc'
            },
            where: {
                usersName: username
            }
        })
        return NextResponse.json(ingredients)
    } catch (error) {
        return NextResponse.json({ msg: 'Error' })
    }
}