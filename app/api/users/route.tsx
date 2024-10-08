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
    // If invalid, return 400 error
    if (!validateion.success)
        return NextResponse.json(validateion.error.errors, { status: 400 });
    // Else return
    return NextResponse.json({ id: 1, name: body.name });
}