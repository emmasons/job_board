// /app/api/auth/jobseeker-login/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const user = await db.user.findUnique({ where: { email } });

  if (!user || !user.password) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  // Success — respond OK, let the client do the signIn with next-auth/react
  return NextResponse.json({ message: "Login successful" });
}