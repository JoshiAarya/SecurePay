import { NextResponse } from "next/server";
import { PrismaClient } from "@repo/db/client";
import { sendEmail } from "../../../lib/sendEmail";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const {email, amount} = await req.json();
        const user = await prisma.user.findUnique({
            where: { email: email },
            include: { balance: true },
        });

        
        if (!user) {
            return NextResponse.json({ message: "User not found" });
        }
        
        await prisma.$transaction([
            prisma.balance.update({
                where: { userId: user.id },
                data: { amount: { increment: amount } },
            }),
            prisma.transaction.create({
                data: {
                    userId: user.id,
                    type: "credit",
                    amount,
                    status: "success",
                },
            }),
        ]);
        
        await sendEmail(user.email, "Amount deposited successfully", `Your account was credited by ${amount} through deposit.`)
        
        return NextResponse.json({ message: "Amount deposited successfully", user, amount }, { status: 201 });
    } catch (error) {
        console.error("Deposit error:", error);
        return NextResponse.json({ message: "Failed to deposit" }, { status: 500 });
    }
}