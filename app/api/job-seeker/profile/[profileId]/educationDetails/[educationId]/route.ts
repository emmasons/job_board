import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";

// Handler for updating education details
export async function PATCH(
  req: Request,
  { params }: { params: { profileId: string; educationId: string } },
) {
  try {
    // Get the user, UserId, values
    const user = await getCurrentSessionUser();
    const UserId = user?.id;
    const values = await req.json();

    // check if user is a job seeker
    if (!UserId || user.role !== Role.JOB_SEEKER) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    // update the database
    const educationDetails = await db.educationDetails.update({
      where: {
        id: params.educationId,
      },
      data: {
        ...values,
      },
    });

    // return a nextresponse
    return NextResponse.json(educationDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

// Handle DELETE for deleting education Details
export async function DELETE(
    req: Request,
    { params }: { params: {profileId: string, educationId: string}}

){
    try {
        // get the user, userId, educationId 
        const user = await getCurrentSessionUser();
        const userId = user?.id;
        const educationId = params.educationId;

        // verify the user
        if (!user || !(user.role === Role.JOB_SEEKER)) {
            return NextResponse.json("Unauthorised", {status: 401})
        }

        // delete result from db where id educationId
        const deleteResult = await db.educationDetails.delete({
            where: {
                id: educationId,
            },
        });
        // response for item not found
        if (!deleteResult){
            return new NextResponse("Not Found", {status: 404});
        }

        // count remaining details using count
        const educationCount = await db.educationDetails.count({
            where: {
                jobSeekerProfileId: params.profileId
            },
        });

        //set deduction percentage
        const educationDeductionPercentage = 20;

        // get previous percentage
        const previousPercentage = await db.jobSeekerProfilePercentage.findUnique({
            where: {
                jobSeekerProfileId: params.profileId
            },
        });

        // check if pervious percentage exits
        if (previousPercentage){
            let newPercentage = previousPercentage.percentage;
            // if no details deduct 20%
            if (educationCount === 0) {
                newPercentage -= educationDeductionPercentage;
            }

            // Ensure percentage doesn't go below 0
            newPercentage = Math.max(0, newPercentage);

            // update the database
            await db.jobSeekerProfilePercentage.update({
                where: {
                    jobSeekerProfileId: params.profileId
                },
                data: {
                    percentage: newPercentage,
                },
            });
        }
        return NextResponse.json({ message: "Education Details deleted"})
    } catch (error) {
        return NextResponse.json({message: "Internal Error"}, {status: 500})
    }
}   