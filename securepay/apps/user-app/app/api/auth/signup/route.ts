import { NextResponse } from "next/server";
import { PrismaClient } from "@repo/db/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email, password, number, name } = await req.json();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to DB
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                number,
            },
        });

        return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ message: "Failed to sign up" }, { status: 500 });
    }
}
