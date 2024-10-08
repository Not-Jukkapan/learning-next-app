import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const user = await prisma.user.findUnique({
        where: {
            id: +params.id
        }
    })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    //validate 
    // If invalid, return 400 error
    const user = prisma.user.create({
        data: {
            name: body.name,
            email: body.email
        }
    })
    if (!body.name)
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
    // Else return
    return NextResponse.json(user, { status: 201 });
}

export async function PUT(request: NextRequest,
    { params }: { params: { id: string } }) {
    const body = await request.json();
    const validateion = schema.safeParse(body);
    if (!validateion.success)
        return NextResponse.json(validateion.error.errors, { status: 404 });

    const user = await prisma.user.findUnique({
        where: {
            id: +params.id
        }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const updatedUser = await prisma.user.update({
        where: {
            id: +user.id
        },
        data: {
            name: body.name,
            email: body.email
        }
    })

    if (+params.id > 10)
        return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(updatedUser);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: number } }) {

    const user = await prisma.user.findUnique({
        where: {
            id: +params.id
        }
    })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const deletedUser = await prisma.user.delete({
        where: {
            id: +params.id
        }
    });
    if (params.id > 10)
        return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(deletedUser);
}