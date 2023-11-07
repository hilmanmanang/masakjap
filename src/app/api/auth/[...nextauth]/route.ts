import { compareHash } from "@/utils/utils";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../prisma/prisma";

let user: any

const getUserByEmail = async (username: string) => {
    try {
        const user = await prisma.users.findFirst({
            where: {
                username
            }
        })
        return user
    } catch (error) {
        return error
    }
}

const handler = NextAuth({
    secret: process.env.SECRET_KEY_NEXT_AUTH,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Insert Username" },
                password: { label: "Password", type: "password", placeholder: "Insert Password" }
            },
            async authorize(credentials) {
                user = await getUserByEmail(credentials?.username || '')
                if (user) {
                    const passowrdMatch = await compareHash(credentials?.password || '', user.password)
                    if (passowrdMatch) {
                        return user
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login"
    },
    callbacks: {
        async session({ session }: any) {
            if (user) {
                session.user = user
                session.user.password = ""
            }
            return session
        },
    }
})

export { handler as GET, handler as POST };
