import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import Error from "next/error";

export const POST = async (req: NextRequest) => {
    const data = await req.json()
    const res = await prisma.ingredients.create({
        data: data
    })
    return NextResponse.json(res)
}