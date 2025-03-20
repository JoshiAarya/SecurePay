import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@repo/db/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ message: "Please Login" }, { status: 401 });
    }

    try {
        // Fetch the user and transactions
        const user = await prisma.user.findUnique({
            where: { email: session.user?.email || "" },
            select: {
                id: true,
                transaction: {
                    select: {
                        id: true,
                        type: true,  // "credit" or "debit"
                        amount: true,
                        status: true,
                        createdAt: true,
                    },
                    orderBy: { createdAt: "desc" }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user.transaction, { status: 200 });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
