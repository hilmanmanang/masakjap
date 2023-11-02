import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export const DELETE = async (req: NextRequest) => {
    const data = await req.json()
    const response = await prisma.ingredients.delete({
        where: {
            id: data.id
        }
    })
    return NextResponse.json(response)
}