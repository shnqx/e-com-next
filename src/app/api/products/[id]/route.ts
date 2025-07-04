import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string[] }> },
) {
  try {
    const id = (await params).id;

    const [rows]: any[] = await db.query("SELECT * FROM products WHERE id = ?", [id]);

    if (rows.length === 0) {
      return NextResponse.json({ message: "Товар не найден" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Ошибка в API:', error);
    return NextResponse.json({ message: "Ошибка сервера при загрузке товара" }, { status: 500 });
  }
}
