import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    const { cartId } = await req.json();

    await db.query(
        `UPDATE carts
        SET quantity = quantity + 1
        WHERE id = ${ cartId }`
    );

    return NextResponse.json({ success: true });
}