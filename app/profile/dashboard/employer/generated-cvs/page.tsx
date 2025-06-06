import { getCurrentSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { FileText, Pencil, Trash2 } from "lucide-react";
import DeleteCvButton from "@/components/DeleteCvButton";
import CvDownloadButton from "@/components/CvDownloadButton";
import Link from "next/link";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 6;

export default async function MyCVsPage({ searchParams }: { searchParams: { page?: string } }) {
  const user = await getCurrentSessionUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Please sign in to view your CVs.</p>
      </div>
    );
  }

  const currentPage = parseInt(searchParams.page || "1", 10);
  const skip = (currentPage - 1) * PAGE_SIZE;

  const [cvs, totalCount] = await Promise.all([
    db.generatedCv.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
    }),
    db.generatedCv.count({ where: { userId: user.id } }),
  ]);

  const userSubscription = await db.subscriptionPlan.findFirst({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
    include: { plan: true },
  });

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">My Generated CVs</h1>

      {cvs.length === 0 ? (
        <p>You haven’t generated any CVs yet.</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvs.map((cv) => (
              <div
                key={cv.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
              >
                <div className="relative group">
                  {cv.previewImageUrl ? (
                    <>
                      <img
                        src={cv.previewImageUrl}
                        alt="CV Preview"
                        className="w-full object-cover rounded-md mb-4"
                      />
                      <Link
                        href={cv.previewImageUrl}
                        target="_blank"
                        className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition rounded-md mb-9"
                      >
                        Preview
                      </Link>
                    </>
                  ) : (
                    <div className="h-48 flex items-center justify-center bg-gray-100 rounded-md mb-4">
                      <FileText className="w-10 h-10 text-gray-400" />
                    </div>
                  )}
                  <p className="text-sm text-gray-500">
                    Created: {new Date(cv.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <CvDownloadButton
                      cvId={cv.id}
                      fileUrl={cv.fileUrl}
                      paymentStatus={cv.paymentStatus}
                      subscription={userSubscription}
                    />

                  <Link
                    href={`/cv/tailor/${cv.id}`}
                    className="px-3 py-1 text-sm flex items-center gap-1 bg-primary text-white rounded  hover:bg-primary/80"
                  >
                    <Pencil size={16} /> Tailor to job
                  </Link>

                  <Link
                    href={`/cv/edit/${cv.id}`}
                    className="px-3 py-1 text-sm flex items-center gap-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                  >
                    <Pencil size={16} /> Edit
                  </Link>

                  <DeleteCvButton cvId={cv.id} />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-4 mt-10">
            {currentPage > 1 && (
              <Link
                href={`?page=${currentPage - 1}`}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Previous
              </Link>
            )}
            {currentPage < totalPages && (
              <Link
                href={`?page=${currentPage + 1}`}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Next
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
