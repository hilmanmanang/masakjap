import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export const PUT = async (req: NextRequest) => {
    try {
        const data = await req.json()
        const { id, fullName, image, username } = data

        const res = await prisma.users.update({
            where: {
                id
            },
            data: {
                fullName,
                username,
                image,
            },
        })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}