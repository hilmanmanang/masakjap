import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export const PUT = async (req: NextRequest) => {
    try {
        const data = await req.json()
        const { id, keyname, enname, myname } = data
        await prisma.ingredientList.update({
            where: {
                id
            },
            data: {
                keyname,
                enname,
                myname
            }
        })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}