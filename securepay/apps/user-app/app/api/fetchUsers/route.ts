import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const users = await prisma.user.findMany({
            select:{
                name: true,
                email: true
            }
        });
        if(!users || users.length === 0){
            return NextResponse.json({
                message: "Failed to fetch users"
            },{
                status: 404
            }
            )
        }
        return NextResponse.json({
            message: "Users fetched successfully",
            users
        },{
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: "Internal server error"
        },{
            status: 500
        })
    }
}