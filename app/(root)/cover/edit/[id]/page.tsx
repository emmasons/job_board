'use client';
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getSession } from "next-auth/react";
import { useEffect, useRef } from "react";


const templates = [
  { name: "impact", image: "/templates/impact.jpg" },
  { name: "polish", image: "/templates/polish.jpg" },
  { name: "prime", image: "/templates/prime.jpg" },
  { name: "spark", image: "/templates/spark.jpg" },
  { name: "aspire", image: "/templates/aspire.jpg" },
  { name: "edge", image: "/templates/edge.jpg" },
  { name: "aura", image: "/templates/aura.jpg" },
];

function TemplatePickerModal({
  onSelect,
  onClose,
}: {
  onSelect: (template: string) => void;
  onClose: () => void;
}) {
return (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-lg max-w-5xl w-full mx-4 relative shadow-lg max-h-[90vh] flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header */}
      <div className="bg-primary/70 px-6 py-2 rounded-t-lg relative">
        <h2 className="text-white text-1xl font-bold text-center">
          CHOOSE A TEMPLATE
        </h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white hover:text-gray-200 transition text-2xl font-bold leading-none"
          aria-label="Close modal"
          type="button"
        >
          ×
        </button>
      </div>

      {/* Modal Body (scrollable) */}
      <div className="p-6 overflow-y-auto flex-1">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {templates.map((tpl) => (
            <div
              key={tpl.name}
              className="cursor-pointer border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              onClick={() => {
                onSelect(tpl.name);
                onClose();
              }}
            >
              <img
                src={tpl.image}
                alt={tpl.name}
                className="w-full aspect-[4/5] object-cover"
              />
              <p className="text-center mt-2 p-2 font-medium capitalize">
                {tpl.name.replace(/_/g, " ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}

export default function CVPage() {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: "",
    job_title: "",
    address: "",
    email: "",
    phone_number: "",
    company_name: "",
    job_applied: "",
    hiring_manager_name: "",
    cover_letter_body: "",
    previewImageUrl: "",
    template: "impact",
    format: "pdf",
  });

  const params = useParams();
  const router = useRouter();
  const cvId = params?.id as string;
  useEffect(() => {
      const fetchCV = async () => {
        setInitialLoading(true); // Show spinner
        const session = await getSession();
        // 1. Redirect to homepage if not logged in
        if (!session) {
          router.push("/");
        return;
         }
  
        try {
          const res = await fetch(`/api/cover/${cvId}`);
   
        if (res.status === 401 || res.status === 403) {
        // 2. Redirect if unauthorized or Cover letter doesn't belong to user
          router.push("/");
          return;
        }
  
        if (!res.ok) {
          throw new Error(`Failed to fetch Cover letter: ${res.status}`);
        }
  
        const data = await res.json();
        // console.log("Fetched Cover Letter Data:", data);
         setFormData({
              full_name: data.full_name || "",
              job_title: data.job_title || "",
              address: data.address || "",
              email: data.email || "",
              phone_number: data.phone_number || "",
              template: data.template || "impact",
              format: data.fileFormat?.toLowerCase() || "pdf",
              previewImageUrl: data.previewImageUrl || "",
              company_name: data.company_name || "",
              job_applied: data.job_applied || "",
              hiring_manager_name: data.hiring_manager_name || "",
              cover_letter_body: data.cover_letter_body || [""],
              
          });
          } catch (err) {
            console.error("Failed to fetch Cover letter:", err);
          } finally {
            setInitialLoading(false); // Hide spinner
          }
      };
  
      fetchCV();
      }, []);


  const [step, setStep] = useState(0);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const handleTemplateSelect = (templateName: string) => {
    setFormData(prev => ({ ...prev, template: templateName }));
    setShowTemplateModal(false);
  };

  const steps = [
    "Personal Info",
    "Job Details",
    "Generate Body",
  ];

  const nextStep = () => setStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));


  const inputClass = "w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300";



  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);


  // ------------------------ This is the code handling generation proceses and checks ----------------------------------------------------------------
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    proceedWithCVGeneration();
  };

  const proceedWithCVGeneration = async () => {

    try {
      setLoading(true);
      setDownloadError(null);

      // 1. Generate the Cover
      const response = await fetch("/api/generate-cover", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        alert("Failed to generate Cover Letter.");
        return;
      }

      const { coverId, fileUrl: unusedFileUrl, previewImageUrl } = await response.json();

      // Show preview
      setPreviewImageUrl(previewImageUrl);

      // 2. Check download permission and get secure file URL
      const res = await fetch("/api/cover/trigger-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coverId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setDownloadError(data.error || "Something went wrong during download check");
        return;
      }

      setDownloadUrl(data.fileUrl); // Download link is valid
    } catch (err) {
      console.error("Download handler error:", err);
      setDownloadError("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };


  // ------------------------ End of Handle generate function ----------------------------------------------------------------

  // ------------------------ Cover Form Fields and Modals ----------------------------------------------------------------

  if (initialLoading) {
      return (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-white bg-opacity-90">
          <div className="flex flex-col items-center gap-4">
            <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <p className="text-lg font-medium text-gray-800">Loading your Cover Letter...</p>
          </div>
        </div>
      );
    }

  return (
    <div className="flex flex-col md:flex-row mx-auto min-h-screen bg-blue-50">
      <SidebarProgress formData={formData} setStep={setStep} />

      <div className="flex-1 max-w-4xl px-4 py-10 md:px-8 md:py-14 bg-blue-50 ml-0 md:ml-64">
        <div className="mx-auto bg-white p-8  shadow-lg">
        
        <form onSubmit={handleGenerate}>

          {step === 0 && (
            <Section title="PERSONAL DETAILS" id="name">
              <h2 className="mb-6 ">Provide your basic personal and contact details.</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input placeholder="Full Name" value={formData.full_name} onChange={e => handleChange("full_name", e.target.value.toUpperCase())} className={inputClass + " uppercase"} />
                <input placeholder="Title / Profession" value={formData.job_title} onChange={e => handleChange("job_title", e.target.value.toUpperCase())} className={inputClass + " uppercase"} />
                <input placeholder="Location Adress" value={formData.address} onChange={e => handleChange("address", e.target.value)} className={inputClass} />
                <input placeholder="Email" value={formData.email} onChange={e => handleChange("email", e.target.value)} className={inputClass} />
                <input placeholder="Phone Number" value={formData.phone_number} onChange={e => handleChange("phone_number", e.target.value)} className={inputClass} />
                {/* Format Select */}
                <div className="md:w-1/3 mt-4 md:mt-0">
                    <label className="block mb-2 font-semibold text-sm">SELECT FORMAT</label>
                    <select
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    className="w-full border p-2 rounded"
                    >
                    <option value="pdf">PDF</option>
                    <option value="docx">WORD</option>
                    </select>
                </div>
              </div>
            </Section>
          )}

          {step === 1 && (
            <Section title="JOB DETAILS" id="job">
              <h2 className="mb-6 ">Provide your basic personal and contact details.</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input placeholder="Company Name (Optional)" value={formData.company_name} onChange={e => handleChange("company_name", e.target.value.toUpperCase())} className={inputClass + " uppercase"} />
                <input placeholder="Hiring Manager Name (Optional)" value={formData.hiring_manager_name} onChange={e => handleChange("hiring_manager_name", e.target.value.toUpperCase())} className={inputClass + " uppercase"} />
                <input placeholder="Desired Job Role" value={formData.job_applied} onChange={e => handleChange("job_applied", e.target.value)} className={inputClass} />
                <div className="mt-1">
                  <button
                    type="button"
                    onClick={() => setShowTemplateModal(true)}
                    className="bg-primary/90 text-white px-6 py-2 rounded hover:bg-primary/70"
                  >
                    Choose Template
                  </button>
                  <p className="mt-2 text-sm text-gray-600">
                    Selected Template:{" "}
                    <strong>{formData.template.replace(/_/g, " ")}</strong>
                  </p>
                </div>
              </div>
            </Section>
          )}


          {step === 2 && (
            <Section title="COVER LETTER" id="cover">
              <div className="relative py-2">
              <AutoResizeTextarea placeholder="Cover Letter body" value={formData.cover_letter_body} onChange={e => handleChange("cover_letter_body", e.target.value)} className={inputClass} rows={6} />
              </div>
            </Section>

          )}

          
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            {step > 0 && (
                <button
                type="button"
                onClick={prevStep}
                className="text-gray-600 border px-4 py-2 rounded hover:bg-gray-100"
                >
                Back
                </button>
            )}

            <div className="ml-auto">
                {step < steps.length - 1 && (
                <button
                    type="button"
                    onClick={() => {
                    // Purely change the step
                    nextStep();
                    }}
                    className="bg-primary/90 text-white px-6 py-2 rounded hover:bg-primary/70"
                >
                    Next
                </button>
                )}

                {step === steps.length - 1 && (
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      Generating...
                      <svg
                        className="w-4 h-4 animate-spin text-white"
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
                          d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4z"
                        ></path>
                      </svg>
                    </>
                  ) : (
                    "Submit Now"
                  )}
                </button>
                )}
            </div>
            </div>

        </form>
      </div>
      </div>

      {/* Right Preview (desktop only) */}
      <div className="py-10 md:py-14 w-full md:w-1/5 self-start">
        <TemplatePreview
          template={formData.template}
          templates={templates}
          onChange={() => setShowTemplateModal(true)}
        />
      </div>

      {showTemplateModal && (
        <TemplatePickerModal
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplateModal(false)}
        />
      )}

      {/* Download Modal */}
      {(downloadUrl || downloadError) && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(5px)' }}
        >
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 relative flex flex-col md:flex-row gap-6 shadow-2xl">
            {/* Left Section */}
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-4">Cover Letter Generated Successfully</h2>

                {downloadUrl ? (
                  <>
                    <p className="mb-4">Your Cover Letter is ready. Click below to download.</p>
                    <a
                      href={downloadUrl}
                      download
                      className="bg-primary/70 text-white px-4 py-2 rounded hover:bg-primary/80 transition"
                    >
                      Download Cover
                    </a>
                  </>
                ) : downloadError ? (
                  <>
                    <p className="mb-4 text-red-600">{downloadError}</p>
                    <a
                      href="/subscription/plans"
                      className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/80 transition"
                    >
                      View Subscription Plans
                    </a>
                  </>
                ) : (
                  <p className="mb-4">Preparing your download...</p>
                )}

                <button
                  onClick={() => {
                    setDownloadUrl(null);
                    setPreviewImageUrl(null);
                    setDownloadError(null);
                  }}
                  className="block mt-4 text-sm text-gray-500 hover:underline"
                >
                  Close
                </button>
              </div>

            {/* Right Section (Image Preview) */}
            {previewImageUrl && (
              <div className="relative group max-h-[75vh] overflow-hidden rounded-xl border shadow-md w-full md:w-1/2">
                <img
                  src={previewImageUrl}
                  alt="CV preview"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            )}
          </div>
        </div>
      )}


    </div>
    
  );
}

// Section Wrapper
function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-6 scroll-mt-20">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}


function SidebarProgress({
  formData,
  setStep,
}: {
  formData: any;
  setStep: (step: number) => void;
}) {
  const steps = [
    { id: "full_name", label: "Name" },
    { id: "job_title", label: "Profession" },
    { id: "address", label: "Location" },
    { id: "email", label: "Email" },
    { id: "phone_number", label: "Phone Number" },
    { id: "job_applied", label: "Job Applied" },
    { id: "cover_letter_body", label: "Cover Body" },
  ];

  // Map each section ID to the corresponding form step index
  const sectionToStepMap: Record<string, number> = {
    full_name: 0,
    job_title: 0,
    address: 0,
    email: 0,
    phone_number: 0,
    job_applied: 1,
    cover_letter_body: 2,
    template: 1,
    format: 0,
  };

  const [progress, setProgress] = useState(0);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

 

  useEffect(() => {
    let filled = 0;
    let total = 7;

    if (formData.full_name) filled++;
    if (formData.job_title) filled++;
    if (formData.address) filled++;
    if (formData.email) filled++;
    if (formData.phone_number) filled++;
    if (formData.job_applied) filled++;
    if (formData.cover_letter_body) filled++;

    setProgress(Math.round((filled / total) * 100));
  }, [formData]);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white px-3 py-2 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          // Close Icon (X)
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Menu Icon (Hamburger)
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      <aside className={`
        fixed top-50 left-0 h-full bg-gray-800 text-white w-64 p-4 z-40 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:block
      `}>
        <ul className="space-y-3 mt-12 md:mt-10">
          {steps.map((step, idx) => {
            const isFilled = (() => {
              if (step.id === "full_name") return !!formData.full_name;
              if (step.id === "job_title") return !!formData.job_title;
              if (step.id === "address") return !!formData.address;
              if (step.id === "email") return !!formData.email;
              if (step.id === "phone_number") return formData.phone_number;
              if (step.id === "job_applied") return !!formData.job_applied;
              if (step.id === "cover_letter_body") return formData.cover_letter_body;

              return false;
            })();

           

            return (
              <li
                key={step.id}
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => {
                  document.getElementById(step.id)?.scrollIntoView({ behavior: "smooth" });
                  setStep(sectionToStepMap[step.id] || 0); 
                  setSidebarOpen(false);
                }}
              >
                <div className={`
                  h-8 w-8 flex items-center justify-center rounded-full border-2 transition-all
                  ${isFilled ? "bg-white text-black font-bold border-white" : "border-white text-white"}
                  ${isFilled ? "ring-2 ring-green-400" : ""}
                `}>
                  {idx + 1}
                </div>
                <span className={`${isFilled ? "text-white font-bold" : "text-gray-300"}`}>
                  {step.label}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-8">
          <div className="h-2 bg-gray-700 rounded">
            <div
              className="h-full bg-green-400 rounded transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm mt-2 text-center">{progress}%</div>
        </div>
      </aside>
    </>
  );
}


// Functions to resize the text area
interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  showBullets?: boolean; 
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  value,
  onChange,
  className = "",
  showBullets = false,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    if (shadowRef.current && textareaRef.current) {
      shadowRef.current.style.height = textareaRef.current.style.height;
    }
  }, [value]);

  // Render bullet points in shadow
  const bulletText = value
    .split("\n")
    .map(line => (line.trim() ? `• ${line}` : " "))
    .join("\n");

  // Matching visual space to bullet (to align caret)
  const paddedValue = value
    .split("\n")
    .map(line => (line.trim() ? `  ${line}` : " "))
    .join("\n");

  if (!showBullets) {
    return (
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        className={`overflow-hidden resize-none ${className}`}
        {...props}
      />
    );
  }

  return (
    <div className="relative w-full">
      {/* Shadow with bullets */}
      <div
        ref={shadowRef}
        aria-hidden="true"
        className="absolute inset-0 whitespace-pre-wrap text-gray-500 px-2 py-2 font-sans pointer-events-none"
      >
        {bulletText}
      </div>

      {/* Fake placeholder */}
      {value.trim() === "" && props.placeholder && (
        <div className="absolute px-3 py-2 text-gray-400 pointer-events-none font-sans">
          {props.placeholder}
        </div>
      )}

      {/* Real transparent textarea */}
      <textarea
        ref={textareaRef}
        value={paddedValue}
        onChange={e => {
          const cleaned = e.target.value
            .split("\n")
            .map(line => line.replace(/^ {2}/, ""))
            .join("\n");
          onChange({ ...e, target: { ...e.target, value: cleaned } });
        }}
        className={`relative bg-transparent text-transparent caret-black font-sans selection:text-black selection:bg-blue-200 placeholder:text-gray-400 overflow-hidden resize-none w-full ${className}`}
        {...props}
      />
    </div>
  );
};


// Functions to display the selected template on the right

function TemplatePreview({
  template,
  templates,
  onChange,
}: {
  template: string;
  templates: { name: string; image: string }[];
  onChange: () => void;
}) {
  const selected = templates.find(t => t.name === template);

  return (
    <div className="bg-white shadow-lg w-full max-w-sm mx-auto">
      <div className="bg-primary/70 text-white text-center font-semibold py-2">
        Selected Template
      </div>
      <div className="p-4">
        <img
          src={selected?.image}
          alt="Selected Template"
          className="w-full object-cover rounded-md border"
        />
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={onChange}
            className="bg-primary/50 text-white px-4 py-2 rounded hover:bg-primary/70"
          >
            Change Template
          </button>
          <p className="mt-2 text-sm text-gray-700">
            Selected: <strong>{template.replace(/_/g, " ")}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}


const SpinnerOverlay = () => (
  <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center rounded">
    <svg
      className="animate-spin h-5 w-5 text-blue-600"
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
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
      ></path>
    </svg>
  </div>
);

