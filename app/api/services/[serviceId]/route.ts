// service
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Service, Role } from "@prisma/client";
import slugify from "slugify";

async function performTransactionWithRetry(
  serviceId: string,
  values: Service,
) {
  const maxRetries = 3;
  let currentRetry = 0;

  while (currentRetry < maxRetries) {
    try {
      await db.$transaction(async (db) => {
        await db.service.update({
          where: {
            id: serviceId,
          },
          data: {
            ...values,
          },
        });
      });

      console.log("[SERVICE_ID]", "Transaction completed successfully!");
      break; // Exit the loop if the transaction succeeds
    } catch (error) {
      console.error(
        `Transaction failed on attempt ${currentRetry + 1}:`,
        error,
      );
      currentRetry++;
    }
  }

  if (currentRetry >= maxRetries) {
    console.log("Transaction failed after maximum retries.");
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { serviceId: string } },
) {
  const author = await getCurrentSessionUser();
  if (!author || author.role !== Role.ADMIN) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { serviceId } = params;
  const values = await req.json();

  if (!values) {
    return NextResponse.json({
      message: "All fields are required",
      status: 400,
    });
  }

  const service = await db.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    return NextResponse.json({ status: 404, message: "Post not found" });
  }

  let slug = service.slug;

  if (values.title) {
    slug = slugify(values.title, {
      lower: true,
      strict: true,
      trim: true,
    });
  }

  try {
    await db.service.update({
      where: {
        id: serviceId,
      },
      data: {
        ...values,
        slug,
      },
    });

    await performTransactionWithRetry(serviceId, values)
      .catch((error) => {
        console.error("[SERVICE_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
      })
      .finally(() => {
        db.$disconnect();
      });

    return NextResponse.json({
      status: 200,
      message: "Service updated successfully",
    });
  } catch (error) {
    console.log("[SERVICE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { serviceId: string } },
) {
  try {
    const user = await getCurrentSessionUser();
    if (!user || user.role !== Role.ADMIN) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { serviceId } = params;

    const service = await db.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    if (!service) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedService = await db.service.delete({
      where: {
        id: serviceId,
      },
    });

    return NextResponse.json(deletedService);
  } catch (error) {
    console.log("[SERVICE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
