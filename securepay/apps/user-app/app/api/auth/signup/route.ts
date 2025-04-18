import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@repo/db/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email, password, number, name } = await req.json();
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Save user to DB 
        const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            // Create the user
            const user = await tx.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                    number,
                },
            });

            // Create an entry in the balance table with the correct userId
            const balance = await tx.balance.create({
                data: {
                    userId: user.id,  
                    amount: 0,        
                },
            });

            return { user, balance };
        });

        return NextResponse.json(
            { message: "User created successfully", user: result.user },
            { status: 201 }
        );
        
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ message: "Failed to sign up" }, { status: 500 });
    }
}
