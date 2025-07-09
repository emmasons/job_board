"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Combobox2 } from "@/components/ui/combobox2";
import { useCountries } from "use-react-countries";

export default function VisaLandingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    age: "",
    country: "",
    education: "",
    occupation: "",
    destination: "",
    purpose: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [flash, setFlash] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const { countries } = useCountries();
  const excludedKeywords = [
    "saint helena",
    "british indian ocean",
    "saint vincent",
    "french southern",
    "heard island",
    "minor outlying islands",
    "virgin islands"
    ];

    const filteredCountries = countries.filter((country) => {
    const name = country.name.toLowerCase();
    return !excludedKeywords.some((kw) => name.includes(kw));
    });

    const countryList = filteredCountries.map((country) => ({
    label: country.name,
    value: country.name,
    }));

  const showFlash = (
    message: string,
    type: "success" | "error" = "success",
    duration = 4000
    ) => {
    setFlash({ message, type });
    setTimeout(() => setFlash(null), duration);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const prompt = `Check visa eligibility with the following details:
- Age: ${formData.age}
- Nationality: ${formData.country}
- Education Level: ${formData.education}
- Occupation: ${formData.occupation}
- Destination Country: ${formData.destination}
- Purpose of Travel: ${formData.purpose}

Please determine the eligibility for a visa. Clearly state:
- Whether the user is eligible
- Visa types available for the selected purpose
- Basic visa requirements in a clean bullet-point format
- Useful tips or alternatives if ineligible
Use clear formatting: headings (###), bold where needed, and lists.`;

    try {
      const res = await fetch("/api/visa-checker", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.response);
      showFlash("Visa check completed successfully.");
    } catch (err) {
      setResult("Something went wrong. Please try again.");
      showFlash("Visa check failed. Try again.", "error");
    }

    setLoading(false);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Flash Notification */}
      {flash && (
        <div className="fixed top-4 right-4 z-[9999]">
          <div
            className={`max-w-sm w-full px-4 py-6 rounded shadow-lg text-white flex items-center justify-between space-x-4 animate-fade-in-out ${
              flash.type === "error" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            <span className="text-sm">{flash.message}</span>
            <button onClick={() => setFlash(null)} className="text-xl font-bold leading-none">
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Modal Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
        <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-fade-in-up">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>

          {!result && (
          <div className="flex justify-center mb-6">
            <Image
            src="/visa-booking.jpg"
            alt="Visa Illustration"
            width={800}
            height={600}
            className="w-full h-auto rounded-2xl shadow-sm"
            />
          </div>
          )}


          <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
            Visa Eligibility Checker
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Your Age"
                className="w-full p-2 border rounded-lg"
              />
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Your Nationality"
                className="w-full p-2 border rounded-lg"
              />
              <input
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Highest Education Level"
                className="w-full p-2 border rounded-lg"
              />
              <input
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Current Occupation"
                className="w-full p-2 border rounded-lg"
              />

              <Combobox2
                options={countryList}
                value={formData.destination}
                onChange={(value) => setFormData({ ...formData, destination: value })}
                defaultText="Select destination country"
              />

              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Purpose of Travel</option>
                <option value="Work">Work</option>
                <option value="Work">Business</option>
                <option value="Study">Study</option>
                <option value="Tourism">Tourism</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-primary/70 hover:bg-primary/80 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
            >
              {loading ? (
                <>
                  Checking...
                  <svg
                    className="w-5 h-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8h4z"
                    ></path>
                  </svg>
                </>
              ) : (
                "Check Eligibility"
              )}
            </button>
          </form>

          {result && (
            <div
                className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200 "
                dangerouslySetInnerHTML={{ __html: result }}
            ></div>
         )}
        </div>
      </div>
    </>
  );
}
