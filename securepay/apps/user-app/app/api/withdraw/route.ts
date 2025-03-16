import { NextResponse } from "next/server";
import { PrismaClient } from "@repo/db/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email, amount } = await req.json();

        // Find user and balance
        const user = await prisma.user.findUnique({
            where: { email: email },
            include: { balance: true },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Check if balance exists and is sufficient
        if (!user.balance || user.balance.amount < amount) {
            return NextResponse.json({ message: "Insufficient balance" }, { status: 400 });
        }

        // Perform withdrawal atomically
        await prisma.$transaction([
            prisma.balance.update({
                where: { userId: user.id },
                data: { amount: { decrement: amount } },
            }),
            prisma.transaction.create({
                data: {
                    userId: user.id,
                    type: "debit",
                    amount,
                    status: "success",
                },
            }),
        ]);

        return NextResponse.json(
            { message: "Amount withdrawn successfully", user, amount },
            { status: 201 }
        );
    } catch (error) {
        console.error("Withdrawal error:", error);
        return NextResponse.json({ message: "Failed to withdraw" }, { status: 500 });
    }
}
