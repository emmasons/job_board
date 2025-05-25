import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "JOB_SEEKER",
      emailVerified: new Date(),
      isVerified: true,
      profile: {
      create: {
          firstName: name.split(" ")[0],
          lastName: name.split(" ").slice(1).join(" "),
      },
      },
    },
  });

  return NextResponse.json({ message: "Registered successfully" });
}
