import { POST } from "../../resend-verification-email/route";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/mailer";
import { EMAILTYPES } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import { User } from "../common";
import { env } from "@/lib/env";

jest.mock("@/lib/db", () => ({
  db: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));
jest.mock("@/lib/mailer");

describe("POST", () => {
  let req: any;

  beforeEach(() => {
    req = {
      nextUrl: new URL(`http://example.com/?toEmail=${User.email}`),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if no email is provided", async () => {
    req.nextUrl.searchParams.delete("toEmail");

    const response = await POST(req);
    const responseBody = await response.json();
    expect(response.status).toBe(500);
    expect(responseBody).toEqual({
      message: "Please provide a valid email address",
    });
  });

  it("should return an error if no user is found with the provided email", async () => {
    db.user.findUnique.mockResolvedValue(null);

    const response = await POST(req);

    const responseBody = await response.json();
    expect(response.status).toBe(500);
    expect(responseBody).toEqual({
      message: "No account was found with that email",
    });
  });

  it("should send an email and return success if everything is valid", async () => {
    const user = { id: 1, ...User };
    db.user.findUnique.mockResolvedValue(user);

    const response = await POST(req);

    expect(sendEmail).toHaveBeenCalledWith({
      toEmail: user.email,
      emailType: EMAILTYPES.EMAILVERIFICATION,
      extraArgs: { userId: user.id },
    });

    const responseBody = await response.json();
    expect(response.status).toBe(200);
    expect(responseBody).toEqual({
      message: "Success.",
    });
  });

  // TODO: Fix this
  it("should return an error if sending email fails", async () => {
    const user = { id: 1, ...User };
    db.user.findUnique.mockResolvedValue(user);
    sendEmail.mockRejectedValue(new Error("Failed to send email"));

    const response = await POST(req);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({
      message: "Error: Failed to send email",
    });
  });
});
