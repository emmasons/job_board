import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function JobTuneModal({
  onTuned,
  cvData
}: {
  onTuned: (newData: any) => void;
  cvData: any;
}) {
  const [open, setOpen] = useState(false);
  const [jobLink, setJobLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);
  const [manualTitle, setManualTitle] = useState("");
  const [manualDescription, setManualDescription] = useState("");
  const [flash, setFlash] = useState<null | { message: string; type: "success" | "error" }>(null);
  useEffect(() => {
    // Automatically open the modal on page load
    setOpen(true);
  }, []);

  const handleTune = async () => {
    if (!cvData) return;

    setLoading(true);
    try {
      const payload = fallbackMode
        ? { cvData, jobTitle: manualTitle, jobDescription: manualDescription }
        : { cvData, jobLink };

      const res = await fetch("/api/tune-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        onTuned(data.tunedCV);
        setOpen(false);
        setFlash({ message: "CV successfully tuned to the job description", type: "success" });

        setTimeout(() => setFlash(null), 4000);
      } else if (data.tooShort) {
        setFallbackMode(true);
      } else {
        setFlash({ message: "Error: " + data.error, type: "error" });
        setTimeout(() => setFlash(null), 4000);
      }
    } catch (err) {
      console.error("Tuning error:", err);
      setFlash({ message: "Something went wrong during tuning.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {flash && (
        <div className="fixed top-4 right-4 z-50">
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <div className="space-y-4">
            {!fallbackMode && (
              <div className="flex justify-center mb-4">
                <Image src="/tailorcv.jpg" alt="Tailor CV Illustration" className="h-auto" />
              </div>
            )}
            <h2 className="text-lg font-semibold">
              {fallbackMode
                ? "Paste Job Title and Description"
                : "Paste Job Description Link"}
            </h2>
            {!fallbackMode ? (
              <input
                type="url"
                value={jobLink}
                onChange={(e) => setJobLink(e.target.value)}
                placeholder="https://example.com/job/..."
                className="w-full border p-2 rounded"
              />
            ) : (
              <>
                <div className="text-sm text-red-400">
                  We couldn’t automatically extract content from that link. Please paste the job title and description manually.
                </div>
                <input
                  type="text"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  placeholder="Job Title"
                  className="w-full border p-2 rounded"
                />
                <textarea
                  rows={6}
                  value={manualDescription}
                  onChange={(e) => setManualDescription(e.target.value)}
                  placeholder="Full job description..."
                  className="w-full border p-2 rounded"
                />
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    className="text-sm underline text-blue-600"
                    onClick={() => setFallbackMode(false)}
                  >
                    Try another link
                  </Button>

                  <Button onClick={handleTune} disabled={loading}>
                    {loading ? (
                    <>
                    Tailoring..
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
                ) : "Tune CV"}
                  </Button>
                </div>
              </>
            )}

            {!fallbackMode && (
              <Button onClick={handleTune} disabled={loading}>
                {loading ? (
                    <>
                    Tailoring..
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
                ) : "Tune CV"}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
