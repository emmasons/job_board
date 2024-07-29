import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";


// PUT handler for updating employment details
export async function PATCH(
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
      
      // Count the remaining skills
    const employmentCount = await db.employmentDetails.count({
      where: { jobSeekerProfileId: params.profileId },
    });

    // Define the deduction percentage
    const additionalDeductionPercentage = 20; // Deduct an additional 25% if all employment are removed

    // Get the previous profile percentage
    const previousPercentage = await db.jobSeekerProfilePercentage.findUnique({
      where: { jobSeekerProfileId: params.profileId },
    });

    if (previousPercentage) {
      let newPercentage = previousPercentage.percentage;

      // If no skills are remaining, add an additional 3% deduction
      if (employmentCount === 0) {
        newPercentage -= additionalDeductionPercentage;
      }

      // Ensure the percentage does not go below 0
      newPercentage = Math.max(0, newPercentage);

      await db.jobSeekerProfilePercentage.update({
        where: { jobSeekerProfileId: params.profileId },
        data: {
          percentage: newPercentage,
        },
      });
    }
      return NextResponse.json({ message: "Employment deleted successfully" }, { status: 200 });
    } catch (error) {
      console.log("[PROFILE_ID]", error);
      console.log(error);
      return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
  }
