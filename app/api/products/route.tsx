import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export function GET(request: NextRequest) {
    return NextResponse.json([
        {
            id: 1, name: 'Milk', price: 10
        },
        {
            id: 2, name: 'Egg', price: 5
        }])
}

export async function POST(request: NextRequest) {

    const body = await request.json();
    const validateion = schema.safeParse(body);
    if (!validateion.success) return NextResponse.json(validateion.error.errors, { status: 400 });

    return NextResponse.json({ id: 10, name: body.name, price: body.price });
}