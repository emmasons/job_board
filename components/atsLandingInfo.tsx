export default function ATSCheckerInfo() {
  return (
    <section className="relative rounded-lg bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            Free AI-Powered ATS Resume Checker
          </h2>
          <p className="text-gray-600 mt-4 text-base">
            Instantly check how well your resume performs against applicant tracking systems.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-2">
              <svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                <path d="M10 2H6a2 2 0 00-2 2v8a2 2 0 002 2h4a2 2 0 002-2V4a2 2 0 00-2-2z" />
              </svg>
              ATS Score Report
            </h3>
            <p className="text-sm text-gray-600">
              Get a score out of 100 based on ATS-friendly formatting and structure.
            </p>
          </article>

          <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-2">
              <svg className="fill-green-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                <path d="M5 8l4 4L15 4" />
              </svg>
              Keyword Match
            </h3>
            <p className="text-sm text-gray-600">
              See how well your resume matches common job keywords and skills.
            </p>
          </article>

          <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-2">
              <svg className="fill-yellow-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                <path d="M3 12h13M3 6h13" />
              </svg>
              Section Check
            </h3>
            <p className="text-sm text-gray-600">
              Identify missing or incomplete resume sections like Experience or Education.
            </p>
          </article>

          <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-2">
              <svg className="fill-purple-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                <path d="M4 4h12v12H4z" />
              </svg>
              Formatting
            </h3>
            <p className="text-sm text-gray-600">
              Find out if your resume’s structure, fonts, or layout could block parsing.
            </p>
          </article>

          <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-2">
              <svg className="fill-green-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                <path d="M5 8l4 4L15 4" />
              </svg>
              Error Detection
            </h3>
            <p className="text-sm text-gray-600">
              Spot spelling, grammar, or structure issues that may harm your chances.
            </p>
          </article>

          <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-2">
              <svg className="fill-pink-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                <circle cx="8" cy="8" r="8" />
              </svg>
              No Sign Up 
            </h3>
            <p className="text-sm text-gray-600">
              Use the resume checker for free with no account or login required.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
