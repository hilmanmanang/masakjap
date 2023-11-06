import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json()
        await prisma.ingredientList.create({
            data: data
        })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}