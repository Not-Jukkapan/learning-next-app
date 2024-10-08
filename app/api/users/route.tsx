import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

// ถ้าไม่ใช้ NextResponse จะเป็นการ return ข้อมูลเป็น JSON โดยตรง
export function GET(request: NextRequest) {
    return NextResponse.json([{
        id: 1,
        name: "Leanne Graham",
        email: "asdasd"
    }, {
        id: 2,
        name: "Ervin Howell",
    }]);
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