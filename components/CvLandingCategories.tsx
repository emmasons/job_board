'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo01 from "@/public/templates/modern.jpg";
import Logo02 from "@/public/templates/compact.jpg";
import Logo03 from "@/public/templates/hybrid.jpg";
import Logo04 from "@/public/templates/elegant.jpg";
import Logo05 from "@/public/templates/creative.jpg";
import Logo06 from "@/public/templates/classic.jpg";
import Logo07 from "@/public/templates/minimalist.jpg";
import Logo08 from "@/public/templates/excecutive.jpg";

const templates = [
  { src: Logo01, alt: "Modern" },
  { src: Logo02, alt: "Compact" },
  { src: Logo03, alt: "Hybrid" },
  { src: Logo04, alt: "Elegant" },
  { src: Logo05, alt: "Creative" },
  { src: Logo06, alt: "Classic" },
  { src: Logo07, alt: "Minimalist" },
  { src: Logo08, alt: "Executive" },
];

export default function CvLandingCategories() {
  const [selectedImage, setSelectedImage] = useState<{ src: any; alt: string } | null>(null);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <button
              key={index}
              className="border rounded shadow bg-white hover:shadow-lg transition"
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
                <Link  href={`/generate-cv?template=${selectedImage.alt.toLowerCase()}`}>
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
