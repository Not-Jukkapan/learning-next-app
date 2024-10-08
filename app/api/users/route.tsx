import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client"

// ถ้าไม่ใช้ NextResponse จะเป็นการ return ข้อมูลเป็น JSON โดยตรง
export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany();

    return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    //validate 
    const validateion = schema.safeParse(body);
    if (!validateion.success)
        return NextResponse.json(validateion.error.errors, { status: 400 });
    // Else return

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })
    if (user) return NextResponse.json({ error: "Email already exists" }, { status: 400 });

    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email
        }
    })
    return NextResponse.json(newUser, { status: 201 });
}