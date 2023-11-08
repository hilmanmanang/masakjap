import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json()
        const { username } = data
        const user = await prisma.users.findFirst({
            where: {
                username
            },
        })
        return NextResponse.json({
            ...user,
            password: ""
        })
    } catch (error) {
        return NextResponse.json({ msg: 'Error' })
    }
}