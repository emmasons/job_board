export default function CoverLetterLandingInfo() {
  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              AI-Powered Cover Letters That Make a Strong First Impression
            </h2>
          </div>

          {/* Grid */}
          <div className="grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3 gap-6 md:*:p-10">
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-900">
                <svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                  <path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
                </svg>
                <span>Smart Cover Letter Drafting</span>
              </h3>
              <p className="text-[15px] text-gray-700">
                Instantly generate personalized cover letters with AI that match your CV and job goals.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-900">
                <svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                  <path d="M14.29 2.614a1 1 0 0 0-1.58-1.228L6.407 9.492l-3.199-3.2a1 1 0 1 0-1.414 1.415l4 4a1 1 0 0 0 1.496-.093l7-9Z" />
                </svg>
                <span>Keyword-Optimized Content</span>
              </h3>
              <p className="text-[15px] text-gray-700">
                Your letter will be tailored with industry-relevant keywords to pass filters and ATS scans.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-900">
                <svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>
                <span>AI Tone Adjustment</span>
              </h3>
              <p className="text-[15px] text-gray-700">
                Adjust tone and voice (formal, confident, friendly) to fit your target company’s culture.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-900">
                <svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                  <path d="M8 0a1 1 0 0 1 1 1v14a1 1 0 1 1-2 0V1Z" />
                </svg>
                <span>Position-Specific Personalization</span>
              </h3>
              <p className="text-[15px] text-gray-700">
                Let AI personalize your letter based on the job description and your profile.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-900">
                <svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                  <path d="M10.284.33a1 1 0 1 0-.574 1.917" />
                </svg>
                <span>Download as PDF or DOCX</span>
              </h3>
              <p className="text-[15px] text-gray-700">
                Easily export your cover letter in high-quality formats suitable for submission or editing.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-900">
                <svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                  <path d="M8 0a8 8 0 108 8A8.009 8.009 0 008 0Z" />
                </svg>
                <span>Template Variety</span>
              </h3>
              <p className="text-[15px] text-gray-700">
                Select from classic, modern, or creative layouts to match your branding style.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
