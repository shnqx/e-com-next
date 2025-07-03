import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { productId, userId } = await req.json();

  await db.query(
    `INSERT INTO carts (user_id, session_id, product_id, quantity)
   VALUES (?, NULL, ?, 1)
   ON DUPLICATE KEY UPDATE quantity = quantity + 1`,
    [userId, productId]
  );

  return NextResponse.json({ success: true });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ products: [] });
  }

  const [cartRows] = await db.query(
    `SELECT p.id, p.name, p.price, p.photo, c.quantity
     FROM carts c
     JOIN products p ON c.product_id = p.id
     WHERE c.user_id = ?`,
    [userId]
  );

  return NextResponse.json({ products: cartRows });
}