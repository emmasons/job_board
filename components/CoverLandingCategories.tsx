'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo01 from "@/public/templates/polish.jpg";
import Logo02 from "@/public/templates/aspire.jpg";
import Logo03 from "@/public/templates/impact.jpg";
import Logo04 from "@/public/templates/spark.jpg";

const templates = [
  { src: Logo01, alt: "Polish" },
  { src: Logo02, alt: "Aspire" },
  { src: Logo03, alt: "Impact" },
  { src: Logo04, alt: "Spark" },
];

export default function CoverLandingCategories() {
  const [selectedImage, setSelectedImage] = useState<{ src: any; alt: string } | null>(null);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <button
              key={index}
              className="border rounded  bg-white hover:shadow-lg transition"
              onClick={() => setSelectedImage(template)}
            >
              <Image
                src={template.src}
                alt={template.alt}
                className="w-full h-auto"
              />
            </button>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(127, 127, 127, 0.6)', backdropFilter: 'blur(5px)' }}
            onClick={() => setSelectedImage(null)} // Close on outside click
          >
            <div
              className="bg-white p-4 rounded-lg shadow-lg relative max-w-md w-full"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>

              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto rounded"
              />

              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold mb-2">
                  {selectedImage.alt} Template
                </h3>
                {selectedImage?.alt && (
                <Link  href={`/generate-cover-letter?template=${selectedImage.alt.toLowerCase()}`}>
                    <button className="px-4 py-2 bg-primary/70 text-white rounded hover:bg-primary/80 transition">
                    → Use This Template
                    </button>
                </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
