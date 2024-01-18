import { POST } from "../route";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

jest.mock("@/lib/db", () => ({
  db: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

const User: User = {
  name: "John Doe",
  email: "LZdUe@example.com",
  password: "password123",
};

describe("POST", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return 400 if email or password is missing", async () => {
    const { email, ...userWithoutEmail } = User;

    const req: any = {
      json: jest.fn().mockResolvedValue(userWithoutEmail),
    };

    const response = await POST(req);
    const responseBody = await response.json();
    expect(response.status).toBe(400);
    expect(responseBody).toEqual({ message: "All fields are required." });
    expect(db.user.findUnique).not.toHaveBeenCalled();
    expect(db.user.create).not.toHaveBeenCalled();
  });

  test("should return 409 if user already exists", async () => {
    const req: any = {
      json: jest.fn().mockResolvedValue(User),
    };

    db.user.findUnique.mockResolvedValue({ email: User.email });

    const response = await POST(req);
    const responseBody = await response.json();

    expect(response.status).toBe(409);
    expect(responseBody).toEqual({ message: "User already exists" });
    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { email: User.email },
    });
    expect(db.user.create).not.toHaveBeenCalled();
  });

  test("should create a new user and return 201", async () => {
    const req: any = {
      json: jest.fn().mockResolvedValue(User),
    };

    db.user.findUnique.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashedPassword");
    db.user.create.mockResolvedValue({});

    const response = await POST(req);
    const responseBody = await response.json();

    expect(response.status).toBe(201);
    expect(responseBody).toEqual({ message: "User Created." });
    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { email: User.email },
    });
    expect(bcrypt.hash).toHaveBeenCalledWith(User.password, 10);
    expect(db.user.create).toHaveBeenCalledWith({
      data: {
        name: "John Doe",
        password: "hashedPassword",
        email: User.email,
      },
    });
  });

  test("should return 500 if an error occurs", async () => {
    const req: any = {
      json: jest.fn().mockRejectedValue(new Error("Database error")),
    };

    const response = await POST(req);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({
      message: "Error: Database error",
    });
  });

  test("should handle bcrypt hash error", async () => {
    const req: any = {
      json: jest.fn().mockResolvedValue(User),
    };

    db.user.findUnique.mockResolvedValue(null);
    bcrypt.hash.mockRejectedValue(new Error("Hashing error"));

    const response = await POST(req);
    const responseBody = await response.json();
    console.debug(responseBody);
    expect(response.status).toBe(500);
    expect(responseBody).toEqual({
      message: "Error: Hashing error",
    });
    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { email: User.email },
    });
    expect(bcrypt.hash).toHaveBeenCalledWith(User.password, 10);
    expect(db.user.create).not.toHaveBeenCalled();
  });

  test("should handle db create error", async () => {
    const req = {
      json: jest.fn().mockResolvedValue({
        name: "John Doe",
        email: User.email,
        password: User.password,
      }),
    };

    db.user.findUnique.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashedPassword");
    db.user.create.mockRejectedValue(new Error("Database create error"));

    const response = await POST(req);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({
      message: "Error: Database create error",
    });
    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { email: User.email },
    });
    expect(bcrypt.hash).toHaveBeenCalledWith(User.password, 10);
    expect(db.user.create).toHaveBeenCalledWith({
      data: {
        name: User.name,
        password: "hashedPassword",
        email: User.email,
      },
    });
  });
});
