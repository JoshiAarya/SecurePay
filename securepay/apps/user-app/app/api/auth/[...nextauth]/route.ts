import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@repo/db/client";
import bcrypt from "bcryptjs"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Phone",
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials: any){
                const db = new PrismaClient()
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email
                        }
                    }
                    return null;
                }
                return null
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
})

export const GET = handler

export const POST = handler