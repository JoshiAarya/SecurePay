import { NextResponse } from "next/server";
import { PrismaClient } from "@repo/db/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const {fromEmail, toEmail, amount} = await req.json();
        const sender = await prisma.user.findUnique({
            where: { email: fromEmail },
            include: { balance: true },
        });
        const receiver = await prisma.user.findUnique({
            where: { email: toEmail },
            include: { balance: true },
        });

        if(!sender){
            return NextResponse.json({ message: "Please Login" });
        }
        if (!receiver) {
            return NextResponse.json({ message: "User not found" });
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

        
        return NextResponse.json({ message: "Amount transferred successfully", sender, receiver, amount }, { status: 201 });
    } catch (error) {
        console.error("Deposit error:", error);
        return NextResponse.json({ message: "Failed to deposit" }, { status: 500 });
    }
}