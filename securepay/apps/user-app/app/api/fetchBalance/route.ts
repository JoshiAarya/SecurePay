"use server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";

const prisma  = new PrismaClient();

export async function GET(req: Request) {
    const session = await getServerSession();
    if(!session){
        return NextResponse.json({message: "Please Login"});
    }
    const user = await prisma.user.findUnique({
        where: {email: session.user?.email||""},
        include: {balance: true}
    })
    if(!user||!user.balance){
        return NextResponse.json({message: "User not found"});
    }
    return NextResponse.json({msg: user.balance.amount||0}, {status: 200});
}