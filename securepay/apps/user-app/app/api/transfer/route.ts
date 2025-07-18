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
        const fromEmail = session.user.email;
        const { toEmail, amount } = await req.json();

        if (fromEmail === toEmail) {
            return NextResponse.json({ message: "Cannot transfer to yourself" }, { status: 400 });
        }
        if (typeof amount !== "number" || amount <= 0) {
            return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
        }

        const sender = await prisma.user.findUnique({
            where: { email: fromEmail },
            include: { balance: true },
        });
        const receiver = await prisma.user.findUnique({
            where: { email: toEmail },
            include: { balance: true },
        });

        if (!sender) {
            return NextResponse.json({ message: "Please Login" }, { status: 400 });
        }
        if (!receiver) {
            return NextResponse.json({ message: "User not found" }, { status: 400 });
        }
        if (!sender.balance || sender.balance.amount < amount) {
            return NextResponse.json({ message: "Insufficient balance" }, { status: 400 });
        }

        await prisma.$transaction([
            prisma.balance.update({
                where: { userId: sender.id },
                data: { amount: { decrement: amount } },
            }),
            prisma.transaction.create({
                data: {
                    userId: sender.id,
                    type: "debit",
                    amount,
                    status: "success",
                },
            }),
            prisma.balance.update({
                where: { userId: receiver.id },
                data: { amount: { increment: amount } },
            }),
            prisma.transaction.create({
                data: {
                    userId: receiver.id,
                    type: "credit",
                    amount,
                    status: "success",
                },
            }),
        ]);

        return NextResponse.json({ message: "Amount transferred successfully", amount }, { status: 201 });
    } catch (error) {
        console.error("Deposit error:", error);
        return NextResponse.json({ message: "Failed to deposit" }, { status: 500 });
    }
}
