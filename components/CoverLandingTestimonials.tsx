
export default function CvLandingTestimonial() {
  return (
    <>
      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div >
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                The Benefits of Cover Letter Templates from Talentra
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Every job seeker knows the importance of tailoring applications. Talentra’s professional cover letter templates serve as a smart foundation—helping you quickly craft compelling letters while still personalizing every word to match the job.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Instead of wasting time formatting, you can focus on impact. Here’s why Talentra templates are trusted by thousands of successful applicants:
              </p>

              <div className="bg-gray-100 p-6 rounded-lg">
                <ul className="space-y-3 text-gray-700">
                  {[
                    "Convenience and ease of use, even for first-time applicants",
                    "Templates that adapt to all industries, from tech to hospitality",
                    "Professionally matched resume and cover letter designs for consistency",
                    "Accelerates job applications without compromising quality",
                    "Built to pass recruiter screenings and ATS software",
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-semibold">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-gray-600 leading-relaxed">
                In summary, Talentra’s templates help you create stunning and strategic applications in less time. Whether you’re in a corporate field or a creative role, our cover letters help you stand out and get hired faster.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
