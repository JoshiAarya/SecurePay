import { NextResponse } from "next/server";
import { PrismaClient } from "@repo/db/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const session = await getServerSession();
        if (!session || !session.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const email = session.user.email;
        const { amount } = await req.json();

        if (typeof amount !== "number" || amount <= 0) {
            return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
            include: { balance: true },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (!user.balance || user.balance.amount < amount) {
            return NextResponse.json({ message: "Insufficient balance" }, { status: 400 });
        }

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
            { message: "Amount withdrawn successfully", amount },
            { status: 201 }
        );
    } catch (error) {
        console.error("Withdrawal error:", error);
        return NextResponse.json({ message: "Failed to withdraw" }, { status: 500 });
    }
}
