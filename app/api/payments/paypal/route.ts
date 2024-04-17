import { NextResponse, NextRequest } from "next/server";
import { sandboxURLs } from "./constants";
import { generateAccessToken } from "./token/generateAccessToken";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";   
    

export async function POST(req: NextRequest, res: NextResponse) {
  const { ORDERS_API_URL } = sandboxURLs;
  const accessToken = await generateAccessToken();
  if (!accessToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await getCurrentSessionUser();
  const userId = user?.id;

  const { jobId } = await req.json();

  // get job cost here but change merchant account to accept kes
  const job = await db.job.findUnique({ where: { id: jobId } });

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const payload = {
    intent: "CAPTURE",
    // change this block and dynamically get the order amount from session
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "10",
        },
      },
    ],
  };
  try {
    const response = await fetch(ORDERS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log(`Create Order Call- ${JSON.stringify(data.status)}`);
    // Once order is created store the data using Prisma
    if (data.status === "CREATED") {
      await db.purchase.create({
        data: {
          orderID: data.id,
          userId,
          jobId,
        },
      });
      return NextResponse.json(data);
    } else {
      return new NextResponse("Purchase unsuccessful", { status: 500 });
    }
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
