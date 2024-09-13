// blog
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { NOTIFICATION_TYPES, Role, SUBSCRIPTION_TYPE } from "@prisma/client";
import slugify from "slugify";
import { sendEmail } from "@/lib/email";
import { env } from "@/lib/env";

export async function POST(req: Request) {
  try {
    const author = await getCurrentSessionUser();

    if (!author || author.role !== Role.ADMIN) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { title } = await req.json();

    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });
    const post = await db.post.create({
      data: {
        // imageUrl,
        title,
        authorId: author.id,
        slug,
      },
    });

    const subscriptions = await db.subscription.findMany({
      where: {
        type: SUBSCRIPTION_TYPE.NEWSLETTER,
      },
    });

    const users = await db.user.findMany({
      where: {
        email: {
          in: subscriptions.map((sub) => sub.email),
        },
      },
    });
    const notifications = users.map((user) => ({
      userId: user.id,
      type: NOTIFICATION_TYPES.NEW_BLOG_POST,
      title: post.title,
      summary: post.epigraph,
      resourceId: `${env.BASE_DOMAIN}/blog/${post.slug}`,
      fromId: author.id,
    }));
    await db.notification.createMany({ data: notifications });
    await Promise.all(
      subscriptions.map(async (subscription) =>
        sendEmail({
          to_email: subscription.email,
          subject: post.title,
          message: `
          <h1>${post.title}</h1>
          <p>${post.epigraph}</p>
          <a href="${env.BASE_DOMAIN}/blog/${post.slug}">Read more</a>
          `,
        }),
      ),
    );

    return NextResponse.json({ id: post.id, message: "Post created" });
  } catch (error) {
    console.log("[BLOG]", error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
