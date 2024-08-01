import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  cookies().set("cookieName", "value");
  const { jobId, visitorId } = await req.json();
  // let visitorId = cookies().get("visitorId")?.value;
  // if (!visitorId) {
  //   const newVisitorId = crypto.randomUUID();
  //   cookies().set("visitorId", newVisitorId, {
  //     maxAge: 60 * 60 * 24 * 365,
  //   });
  //   visitorId = newVisitorId;
  // }
  console.log(visitorId, "*********");

  if (!jobId) {
    return new NextResponse("Bad request", { status: 400 });
  }

  try {
    const metric = await db.jobMetrics.findFirst({
      where: {
        visitorId,
        jobId,
      },
    });

    if (metric) {
      return new NextResponse("Success", { status: 200 });
    }
    await db.jobMetrics.create({
      data: {
        visitorId,
        jobId,
        view: 1,
      },
    });
    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Bad request", { status: 400 });
  }
}

// export async function GET(request: NextRequest) {
//   // Note that visitorId (if it exists) is an object with
//   // a name and value field, not a string like before
//   const visitorId = request.cookies.get("visitorId");
//   console.log(visitorId, "*********");
//   if (visitorId) {
//     return NextResponse.json({ message: "Welcome back!" });
//   }
//   const newVisitorId = crypto.randomUUID();
//   const response = NextResponse.json({ message: "Welcome!" });
//   response.cookies.set("visitorId", newVisitorId);
//   return response;
// }
