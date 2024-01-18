import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    const duplicate = await db.user.findUnique({ where: { email: email } });

    if (duplicate) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        password: hashPassword,
        email,
      },
    });
    return NextResponse.json({ message: "User Created." }, { status: 201 });
  } catch (error: Error | any) {
    return NextResponse.json({ message: error.toString() }, { status: 500 });
  }
}
