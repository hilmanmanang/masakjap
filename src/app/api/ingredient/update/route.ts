import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export const PUT = async (req: NextRequest) => {
    try {
        const data = await req.json()
        const { id, name, keyname, expiredDate } = data
        await prisma.ingredients.update({
            where: {
                id
            },
            data: {
                name,
                keyname,
                expiredDate
            }
        })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}