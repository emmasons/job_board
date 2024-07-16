import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

// POST handler for creating employment details
// export async function POST(
//   req: Request,
//   { params }: { params: { profileId: string } },
// ) {
//   try {
//     const user = await getCurrentSessionUser();
//     const userId = user?.id;
//     const values = await req.json();

//     if (!userId || user.role !== Role.JOB_SEEKER) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const employmentDetails = await db.employmentDetails.create({
//       data: {
//         ...values,
//         jobSeekerProfileId: params.profileId,
//       },
//     });
//     return NextResponse.json(employmentDetails, { status: 201 });
//   } catch (error) {
//     console.log("[PROFILE_ID]", error);
//     return NextResponse.json({ message: "Internal Error" }, { status: 500 });
//   }
// }

// // GET handler for fetching employment details
// export async function GET(
//   req: Request,
//   { params }: { params: { profileId: string } },
// ) {
//   try {
//     const employmentDetails = await db.employmentDetails.findMany({
//       where: {
//         jobSeekerProfileId: params.profileId,
//       },
//     });
//     return NextResponse.json(employmentDetails, { status: 200 });
//   } catch (error) {
//     console.log("[PROFILE_ID]", error);
//     return NextResponse.json({ message: "Internal Error" }, { status: 500 });
//   }
// }

// PUT handler for updating employment details
export async function PUT(
  req: Request,
  { params }: { params: { profileId: string; employmentId: string } },
) {
  try {
    const user = await getCurrentSessionUser();
    const userId = user?.id;
    const values = await req.json();

    if (!userId || user.role !== Role.JOB_SEEKER) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const employmentDetails = await db.employmentDetails.update({
      where: {
        id: params.employmentId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(employmentDetails, { status: 200 });
  } catch (error) {
    console.log("[PROFILE_ID]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}


// DELETE handler for deleting employment details
export async function DELETE(
    req: Request,
    { params }: { params: { profileId: string, employmentId: string } },
  ) {
    try {
      const user = await getCurrentSessionUser();
      const userId = user?.id;
  
      if (!userId || !(user.role === Role.JOB_SEEKER)) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const employmentId = params.employmentId;
      const deleteResult = await db.employmentDetails.delete({
        where: {
          id: employmentId,
        },
      });
  
      if (!deleteResult) {
        return new NextResponse("Not Found", { status: 404 });
      }
  
      return NextResponse.json({ message: "Employment deleted successfully" }, { status: 200 });
    } catch (error) {
      console.log("[PROFILE_ID]", error);
      console.log(error);
      return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
  }
