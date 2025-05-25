'use client';
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { getSession } from "next-auth/react";
import JobTuneModal from '@/components/JobTuneModal';

const templates = [
  { name: "basic", image: "/templates/basic.jpg" },
  { name: "modern", image: "/templates/modern.jpg" },
  { name: "minimalist", image: "/templates/minimalist.jpg" },
  { name: "hybrid", image: "/templates/hybrid.jpg" },
  { name: "elegant", image: "/templates/elegant.jpg" },
  { name: "compact", image: "/templates/compact.jpg" },
  { name: "timeline", image: "/templates/timeline.jpg" },
  { name: "classic", image: "/templates/classic.jpg" },
  { name: "creative", image: "/templates/creative.jpg" },
  { name: "excecutive", image: "/templates/excecutive.jpg" },
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
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
  const [originalCvData, setOriginalCvData] = useState<any>(null); 
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    profile: "",
    contact_info: "PHONE: \nEMAIL: ",
    skills: [""],
    achievements: [""],
    experience_list: [{ role: "", place_of_work: "", date: "", responsibilities: [""] }],
    education_list: [{ course: "", school: "", date: "", description: "" }],
    referees_list: [{ refname: "", role: "", contact: "" }],
    template: "basic",
    photo: "",
    previewImageUrl: "",
    format: "pdf",
  });

const params = useParams();
const router = useRouter();
const cvId = params?.id as string;

useEffect(() => {
  const fetchCV = async () => {
    setInitialLoading(true);
    const session = await getSession();
    if (!session) {
      router.push("/");
      return;
    }

    try {
      const res = await fetch(`/api/cv/${cvId}`);
      if (res.status === 401 || res.status === 403) {
        router.push("/");
        return;
      }

      const data = await res.json();
      setOriginalCvData(data);

      setFormData({
        name: data.name || "",
        title: data.title || "",
        profile: data.profile || "",
        contact_info:
          typeof data.contactInfo === "string"
            ? data.contactInfo
            : (data.contactInfo || []).join("\n") || "PHONE: \nEMAIL: ",
        skills: data.skills || [""],
        achievements: data.achievements || [""],
        photo: data.photoUrl || "",
        template: data.template || "basic",
        format: data.fileFormat?.toLowerCase() || "pdf",
        previewImageUrl: data.previewImageUrl || "",
        experience_list:
          (data.experience || []).map((exp: any) => ({
            role: exp.role || "",
            place_of_work: exp.placeOfWork || "",
            date: exp.date || "",
            responsibilities: exp.responsibilities || [""],
          })) || [{ role: "", place_of_work: "", date: "", responsibilities: [""] }],
        education_list:
          (data.education || []).map((edu: any) => ({
            course: edu.course || "",
            school: edu.school || "",
            date: edu.date || "",
            description: edu.description || "",
          })) || [{ course: "", school: "", date: "", description: "" }],
        referees_list:
          (data.referees || []).map((ref: any) => ({
            refname: ref.refname || "",
            role: ref.role || "",
            contact: ref.contact || "",
          })) || [{ refname: "", role: "", contact: "" }],
      });
    } catch (err) {
      console.error("Failed to fetch CV:", err);
    } finally {
      setInitialLoading(false);
    }
  };

  fetchCV();
}, []);


  const [showAchievements, setShowAchievements] = useState(true);
  const [showReferees, setShowReferees] = useState(false);

  const [step, setStep] = useState(0);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const handleTemplateSelect = (templateName: string) => {
    setFormData(prev => ({ ...prev, template: templateName }));
    setShowTemplateModal(false);
  };

  const steps = [
    "Basic Info",
    "Experience & Skills",
    "Profile Summary",
    "Education",
    "Achievements & Referees",
  ];

  const nextStep = () => setStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));


  const inputClass = "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300";


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await fetch("/api/upload-photo", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Upload failed:", text);
        return;
      }

      const data = await response.json();

      if (data?.url) {
        handleChange("photo", data.url); 
      } else {
        console.warn("No URL returned in upload response.");
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };


  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleArrayChange = (section: string, index: number, key: string, value: any) => {
    const updated = [...(formData as any)[section]];
    updated[index][key] = value;
    setFormData({ ...formData, [section]: updated });
  };

  const handleAddEntry = (section: string, entry: any) => {
    setFormData({ ...formData, [section]: [...(formData as any)[section], entry] });
  };

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);


  // ------------------------ This is the code handling generation proceses and checks ----------------------------------------------------------------
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    proceedWithCVGeneration();
  };

  const proceedWithCVGeneration = async () => {
    setLoading(true);

    const cleanArray = (arr?: string[]) =>
      (arr || []).map((s) => s.trim()).filter((s) => s.length > 0);

    const cleanedData = {
      ...formData,
      skills: cleanArray(formData.skills),
      achievements: cleanArray(formData.achievements),
      experience_list: formData.experience_list.map((exp) => ({
        ...exp,
        responsibilities: cleanArray(exp.responsibilities),
      })),
    };

    const response = await fetch(`/api/tailorCv/${cvId}`, {
      method: "PUT",
      body: JSON.stringify(cleanedData),
      headers: { "Content-Type": "application/json" },
    });


    if (response.ok) {
      const { fileUrl, previewImageUrl } = await response.json();
      setPreviewImageUrl(previewImageUrl);
      setDownloadUrl(fileUrl); // open download modal
    } else {
      alert("Failed to generate CV.");
    }

    setLoading(false);
  };

  // ------------------------ End of Handle generate function ----------------------------------------------------------------

  // ------------------------ CV Form Fields and Modals ----------------------------------------------------------------

  if (initialLoading) {
    return (
      <div className="fixed inset-0 z-30 flex items-center justify-center bg-white bg-opacity-90">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <p className="text-lg font-medium text-gray-800">Loading your CV...</p>
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
            <Section title="BASIC INFORMATION" id="name">
              <h2 className="mb-6 ">Provide your basic personal and contact details.</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Full Name" value={formData.name} onChange={e => handleChange("name", e.target.value.toUpperCase())} className={inputClass + " uppercase"} />
                <input placeholder="Title / Profession" value={formData.title} onChange={e => handleChange("title", e.target.value.toUpperCase())} className={inputClass + " uppercase"} />
                <AutoResizeTextarea
                  placeholder="PHONE: 0712345678\nEMAIL: example@email.com"
                  value={formData.contact_info}
                  onChange={e => handleChange("contact_info", e.target.value)}
                  className={inputClass}
                  rows={2}
                />
                <div className="mt-6">
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

          {step === 1 && (
            <>
              <Section title="EXPERIENCE" id="experience_list">
                <h2 className="mb-6">Start from your most recent experience.</h2>
                {formData.experience_list.map((exp, idx) => (
                  <div key={idx} className="p-1 rounded mb-6 bg-gray-50">
                    {/* Place of Work full width */}
                    <div className="mb-4">
                      <input
                        placeholder="Place of Work"
                        value={exp.place_of_work}
                        onChange={e => handleArrayChange("experience_list", idx, "place_of_work", e.target.value)}
                        className={inputClass + " w-full"}
                      />
                    </div>

                    {/* Role and Date side by side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        placeholder="Role"
                        value={exp.role}
                        onChange={(e) => {
                          const newRole = e.target.value;
                          handleArrayChange("experience_list", idx, "role", newRole);
                        }}
                        className={inputClass}
                      />
                      <input
                        placeholder="Date"
                        value={exp.date}
                        onChange={e => handleArrayChange("experience_list", idx, "date", e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    {/* Responsibilities textarea full width */}
                    <div className="mb-4 relative">
                      <AutoResizeTextarea
                        placeholder="Responsibilities"
                        value={exp.responsibilities.join("\n")}
                        onChange={e =>
                          handleArrayChange("experience_list", idx, "responsibilities", e.target.value.split("\n"))
                        }
                        className={inputClass + " w-full"}
                        rows={5}
                        showBullets={true}
                      />
                    </div>


                    {/* Remove button */}
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.experience_list.filter((_, i) => i !== idx);
                          handleChange("experience_list", updated);
                        }}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Remove Experience
                      </button>
                    </div>
                  </div>
                ))}

                <AddButton
                  label="Add Experience"
                  onClick={() =>
                    handleAddEntry("experience_list", {
                      role: "",
                      place_of_work: "",
                      date: "",
                      responsibilities: [""],
                    })
                  }
                />
              </Section>


              <Section title="SKILLS" id="skills">
              <div className="relative py-2">
                <AutoResizeTextarea
                  placeholder="Enter one skill per line"
                  value={formData.skills.join("\n")}
                  onChange={e =>
                    handleChange("skills", e.target.value.split("\n"))
                  }
                  className={inputClass}
                  rows={6}
                  showBullets={true}
                />
              </div>
            </Section>


            </>
          )}

          {step === 2 && (
            <Section title="PROFILE SUMMARY" id="profile">
              <div className="relative py-2">
              <AutoResizeTextarea placeholder="Profile Summary" value={formData.profile} onChange={e => handleChange("profile", e.target.value)} className={inputClass} rows={6} />
              </div>
            </Section>
          )}

          {step === 3 && (
            <Section title="EDUCATION" id="education_list">
              <h2 className="mb-6 ">Provide your Education details.</h2>
              {formData.education_list.map((edu, idx) => (
                <div key={idx} className="p-1 rounded mb-6 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      placeholder="Course"
                      value={edu.course}
                      onChange={e => handleArrayChange("education_list", idx, "course", e.target.value)}
                      className={inputClass}
                    />
                    <input
                      placeholder="Date"
                      value={edu.date}
                      onChange={e => handleArrayChange("education_list", idx, "date", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      placeholder="School"
                      value={edu.school}
                      onChange={e => handleArrayChange("education_list", idx, "school", e.target.value)}
                      className={inputClass + " w-full"}
                    />
                  </div>
                  <div className="mb-4">
                    <AutoResizeTextarea
                      placeholder="Description (Optional)"
                      value={edu.description}
                      onChange={e => handleArrayChange("education_list", idx, "description", e.target.value)}
                      className={inputClass + " w-full"}
                      rows={1}
                    />
                  </div>
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formData.education_list.filter((_, i) => i !== idx);
                        handleChange("education_list", updated);
                      }}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Remove Education
                    </button>
                  </div>
                </div>
              ))}
              <AddButton
                label="Add Education"
                onClick={() =>
                  handleAddEntry("education_list", {
                    course: "",
                    school: "",
                    date: "",
                    description: "",
                  })
                }
              />
            </Section>

          )}

          {step === 4 && (
            <>
              {/* Achievements Section */}
              {!showAchievements && formData.achievements.length === 0 ? (
                <div className="mb-6">
                  <p className="mb-2">Do you want to add achievements?</p>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowAchievements(true)}
                      className="px-4 py-2 border border-green-500 text-green-600 rounded-full hover:bg-green-100 flex items-center gap-2"
                    >
                      ✓ Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAchievements(false);
                        handleChange("achievements", []);
                      }}
                      className="px-4 py-2 border border-red-500 text-red-600 rounded-full hover:bg-red-100 flex items-center gap-2"
                    >
                      ✗ No
                    </button>
                  </div>
                </div>
              ) : showAchievements || formData.achievements.length > 0 ? (
                <Section title="ACHIEVEMENTS (optional)" id="achievements">
                  <div className="mb-2 flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAchievements(false);
                          handleChange("achievements", []);
                        }}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Remove Section
                      </button>
                    </div>
                  </div>
                  <div className="relative py-2">
                  <AutoResizeTextarea
                    placeholder="Enter one achievement per line"
                    value={formData.achievements.join("\n")}
                    onChange={e =>
                      handleChange("achievements", e.target.value.split("\n"))
                    }
                    className={inputClass}
                    rows={4}
                    showBullets={true}
                  />
                  </div>
                </Section>

              ) : null}


              {/* Referees Section */}
              {!showReferees && formData.referees_list.length === 0 ? (
                <div className="mb-6">
                  <p className="mb-2">Would you like to include referees in your CV?</p>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowReferees(true);
                        handleAddEntry("referees_list", { refname: "", role: "", contact: "" });
                      }}
                      className="px-4 py-2 border border-green-500 text-green-600 rounded-full hover:bg-green-100 flex items-center gap-2"
                    >
                      ✓ Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowReferees(false);
                        handleChange("referees_list", []);
                      }}
                      className="px-4 py-2 border border-red-500 text-red-600 rounded-full hover:bg-red-100 flex items-center gap-2"
                    >
                      ✗ No
                    </button>
                  </div>
                </div>
              ) : showReferees || formData.referees_list.length > 0 ? (
                <Section title="REFEREES (optional)" id="referees_list">
                  <div className="mb-2 flex justify-between items-center">
                    <h2 className="mb-2">Referees List</h2>
                    <button
                      type="button"
                      onClick={() => {
                        setShowReferees(false);
                        handleChange("referees_list", []);
                      }}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Remove Section
                    </button>
                  </div>

                  {formData.referees_list.map((ref, idx) => (
                    <div key={idx} className="p-1 rounded mb-6 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <input
                          placeholder="Name"
                          value={ref.refname}
                          onChange={e => handleArrayChange("referees_list", idx, "refname", e.target.value)}
                          className={inputClass}
                        />
                        <input
                          placeholder="Role"
                          value={ref.role}
                          onChange={e => handleArrayChange("referees_list", idx, "role", e.target.value)}
                          className={inputClass}
                        />
                        <input
                          placeholder="Contact"
                          value={ref.contact}
                          onChange={e => handleArrayChange("referees_list", idx, "contact", e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div className="text-right">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.referees_list.filter((_, i) => i !== idx);
                            handleChange("referees_list", updated);
                          }}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Remove Referee
                        </button>
                      </div>
                    </div>
                  ))}
                  <AddButton
                    label="Add Referee"
                    onClick={() => handleAddEntry("referees_list", { refname: "", role: "", contact: "" })}
                  />
                </Section>
              ) : null}



              <div className="md:flex md:gap-4 md:items-end">
              {/* Photo Upload */}
              <div className="md:flex-1">
                <label className="block mb-2 font-semibold text-sm">PHOTO: (optional)</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                    className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0
                            file:text-sm file:font-semibold file:bg-primary file:text-white file:rounded
                            hover:file:bg-primary/80 cursor-pointer"
                />
                
                {/* Preview section */}
                {formData.photo && (
                    <div className="mt-4">
                    <p className="text-xs text-gray-600 mb-1">Current Photo Preview:</p>
                    <img
                        src={formData.photo}
                        alt="Photo preview"
                        className="w-32 h-32 object-cover rounded-full border border-gray-300"
                    />
                    </div>
                )}
                </div>


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
            </>
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
                    "Generate CV"
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
          previewImageUrl={formData.previewImageUrl}
          onChange={() => setShowTemplateModal(true)}
        />
      </div>

      {showTemplateModal && (
        <TemplatePickerModal
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplateModal(false)}
        />
      )}

      {!initialLoading && formData && (
        <JobTuneModal
            cvData={formData}
            onTuned={(newData) => {
            setFormData(newData);
            }}
        />
        )}


      {/* Download Modal */}
      {downloadUrl && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(5px)' }}
        >
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 relative flex flex-col md:flex-row gap-6 shadow-2xl">
            {/* Left Section */}
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-4">CV Edited Successfully</h2>
              <p className="mb-4">Your CV is ready. Click below to download.</p>
              <a
                href={downloadUrl}
                download
                className="bg-primary/70 text-white px-4 py-2 rounded hover:bg-primary/80 transition"
              >
                Download CV
              </a>
              <button
                onClick={() => {
                  setDownloadUrl(null);
                  setPreviewImageUrl(null);
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

// Add Button
function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="text-sm text-blue-600 hover:underline">
      + {label}
    </button>
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
    { id: "name", label: "Name" },
    { id: "title", label: "Profession" },
    { id: "experience_list", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "profile", label: "Summary" },
    { id: "education_list", label: "Education" },
    { id: "achievements", label: "Achievements" },
    { id: "referees_list", label: "Referees" },
  ];

  // Map each section ID to the corresponding form step index
  const sectionToStepMap: Record<string, number> = {
    name: 0,
    title: 0,
    experience_list: 1,
    skills: 1,
    profile: 2,
    education_list: 3,
    achievements: 4,
    referees_list: 4,
  };

  const [progress, setProgress] = useState(0);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

 

  useEffect(() => {
    let filled = 0;
    let total = 6;

    if (formData.name) filled++;
    if (formData.title) filled++;
    if (formData.profile) filled++;
    if (formData.experience_list?.some(e => e.role || e.place_of_work)) filled++;
    if (formData.skills?.some(s => s)) filled++;
    if (formData.education_list?.some(e => e.course || e.school)) filled++;

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
              if (step.id === "name") return !!formData.name;
              if (step.id === "title") return !!formData.title;
              if (step.id === "profile") return !!formData.profile;
              if (step.id === "experience_list") return formData.experience_list?.some(e => e.role || e.place_of_work);
              if (step.id === "skills") return formData.skills?.some(s => s);
              if (step.id === "achievements") return formData.achievements?.some(a => a);
              if (step.id === "education_list") return formData.education_list?.some(e => e.course || e.school);
              if (step.id === "referees_list") return formData.referees_list?.some(r => r.refname || r.contact);
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
  previewImageUrl,
}: {
  template: string;
  templates: { name: string; image: string }[];
  onChange: () => void;
  previewImageUrl?: string | null;
}) {
  const initialTemplateRef = useRef(template);
  const [userChangedTemplate, setUserChangedTemplate] = useState(false);

  useEffect(() => {
    // Reset if user returns to original template
    if (template === initialTemplateRef.current) {
      setUserChangedTemplate(false);
    } else {
      setUserChangedTemplate(true);
    }
  }, [template]);

  const selected = templates.find(t => t.name === template);

  const handleChange = () => {
    onChange();
  };

  const imageToShow =
    !userChangedTemplate && previewImageUrl
      ? previewImageUrl
      : selected?.image || null;

  return (
    <div className="bg-white shadow-lg w-full max-w-sm mx-auto">
      <div className="bg-primary/70 text-white text-center font-semibold py-2">
        Selected Template
      </div>
      <div className="p-4">
        {imageToShow ? (
          <img
            src={imageToShow}
            alt="Selected Template"
            className="w-full object-cover rounded-md border"
          />
        ) : (
          <p className="text-gray-500 text-center italic">
            No preview available
          </p>
        )}

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={handleChange}
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