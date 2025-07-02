import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

// Регистрация пользователя
export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Проверка, есть ли такой пользователь
  const [users] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
  if ((users as any[]).length > 0) {
    return NextResponse.json({ error: "Пользователь уже существует" }, { status: 400 });
  }

  // Хешируем пароль и сохраняем пользователя
  const hash = await bcrypt.hash(password, 10);
  await db.query("INSERT INTO users (email, password_hash) VALUES (?, ?)", [email, hash]);

  return NextResponse.json({ success: true });
}

// Авторизация пользователя
export async function PUT(req: Request) {
  const { email, password } = await req.json();

  const [users] = await db.query("SELECT id, password_hash FROM users WHERE email = ?", [email]);
  const user = (users as any[])[0];

  if (!user) {
    return NextResponse.json({ error: "Пользователь не найден" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });
  }

  return NextResponse.json({ success: true, userId: user.id });
}