import { getCurrentSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { FileText, Pencil } from "lucide-react";
import Image from "next/image";
import DeleteCvButton from "@/components/DeleteCvButton";
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

  if (user.role === "ADMIN") {
    // Admin: all users' CVs paginated
    const [allCvs, totalGenerated, adminCvs] = await Promise.all([
      db.generatedCv.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: PAGE_SIZE,
      }),
      db.generatedCv.count(),
      db.generatedCv.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const totalPages = Math.ceil(totalGenerated / PAGE_SIZE);

    return (
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-4">Admin - All Generated CVs</h1>
        <p className="mb-8 text-lg font-medium">Total CVs: {totalGenerated}</p>

        {allCvs.length === 0 ? (
          <p>No CVs have been generated yet.</p>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCvs.map((cv) => (
                <div key={cv.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
                  <div className="relative group">
                    {cv.previewImageUrl ? (
                      <>
                        <Image
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
                    <p className="text-sm text-gray-700 mt-1">
                        Name: {cv.name} {cv.user.lastName}<br />
                        Email: {cv.user.email}<br />
                        Payment Status: {cv.paymentStatus || "N/A"}
                    </p>

                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={cv.fileUrl}
                      download
                      className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/80 transition"
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Admin Pagination */}
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

        {/* Admin's Own CVs */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">My CVs (Admin)</h2>
          {adminCvs.length === 0 ? (
            <p>You haven’t generated any CVs yourself.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminCvs.map((cv) => (
                <div
                  key={cv.id}
                  className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
                >
                  <div className="relative group">
                    {cv.previewImageUrl ? (
                      <>
                        <Image
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
                    <a
                      href={cv.fileUrl}
                      download
                      className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/80 transition"
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Regular USER view
  const [cvs, totalCount] = await Promise.all([
    db.generatedCv.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
    }),
    db.generatedCv.count({ where: { userId: user.id } }),
  ]);

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
                      <Image
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
                  <a
                    href={cv.fileUrl}
                    download
                    className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/80 transition"
                  >
                    Download
                  </a>

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
