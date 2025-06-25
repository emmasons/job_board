"use client";

import { useState } from "react";
import {
  Button
} from "@/components/ui/button";
import {
  Lock, Gauge, ListChecks, FileText, Mail, Phone, Hash, Settings2, BookOpen, UploadCloud
} from "lucide-react";
import Hero from "@/components/atsLandingHome";
import ATSCheckerInfo from "@/components/atsLandingInfo";


export default function ATSChecker() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/ats-analyzer", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#00c853"; // green
    if (score >= 50) return "#ff9800"; // orange
    return "#f44336"; // red
  };


  return (
    <div className="w-full bg-gray-100  flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip" >
        {!result && (
        <div>
            <Hero />
        </div>
        )}
       <div  id="ats-checker-form" className="mt-10 p-7 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        
        {/* Upload Card Styled */}
        <div
        className={`bg-white rounded-xl border w-full max-w-md mx-auto col-span-12 xl:col-span-5
            xl:sticky xl:top-28 xl:self-start" : "relative" 
            transition-all duration-300`}
        style={{ height: "fit-content" }} 
        >
        {/* Drag-and-Drop Zone */}
        <div
            className="bg-gray-800 rounded-t-xl text-center px-4 py-10 cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("resume-input")?.click()}
        >
            <UploadCloud className="mx-auto text-primary/80 mb-2" size={28} />
            <p className="text-white font-medium">
            {file ? file.name : "Click here or Drag & Drop to Upload"}
            </p>
            <input
            id="resume-input"
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
            />
        </div>

        {/* Button & Footer */}
        <div className="px-6 py-4">
            <Button
            disabled={!file || loading}
            onClick={handleSubmit}
            className="w-full bg-primary/80 hover:bg-primary/70 disabled:opacity-50"
            >
            {loading ? "Analyzing..." : "Check Resume"}
            </Button>
            <p className="text-xs mt-3 text-gray-500 flex items-center justify-center gap-1">
            <Lock size={12} /> Privacy Guaranteed
            </p>
        </div>
        </div>

        
        {/* Welcome/Info Section - Only show when no result */}
        {!result && (
        <div className="col-span-12 xl:col-span-7">
            <ATSCheckerInfo />
        </div>
        )}



        <div className="col-span-12 xl:col-span-7">
        {/* Continue with existing logic */}
        {result && (
          <>
            {/* ATS SCORE & PARSE RATE */}
            <div className="bg-white p-6 rounded-xl shadow-sm border mb-7.5">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: ATS SCORE */}
                <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg text-center shadow-sm">
                <h2 className="text-xl font-bold flex justify-center items-center gap-2 mb-4 text-gray-800">
                    <Gauge /> Your ATS Score
                </h2>
                <div className="relative w-40 h-40 mx-auto">
                    <svg className="w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="70" stroke="#eee" strokeWidth="16" fill="none" />
                    <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke={getScoreColor(parseInt(result.atsScore))}
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray="440"
                        strokeDashoffset={440 - (parseInt(result.atsScore) / 100) * 440}
                        strokeLinecap="round"
                    />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-extrabold text-gray-800">
                    {result.atsScore}
                    </div>
                </div>
                <p className="text-gray-600 mt-4 text-sm">
                    A higher score indicates better optimization for applicant tracking systems.
                </p>
                </div>

                {/* Right: ATS PARSE RATE + RESUME LENGTH */}
                <div className="lg:w-2/3 space-y-8">
                {/* ATS PARSE RATE */}
                <div className="border border-gray-200 p-6 rounded-lg text-center">
                    <h2 className="text-xl font-bold flex justify-center items-center gap-2 mb-2 text-gray-800">
                    <ListChecks /> ATS Parse Rate
                    </h2>
                    <p className="text-gray-600 text-sm mb-2">
                    Measures how well your resume can be read by ATS systems.
                    </p>
                    {(() => {
                    const rate = parseFloat(result.parseRate);
                    const barColor =
                        rate >= 80 ? "bg-green-500" :
                        rate >= 60 ? "bg-orange-400" :
                        "bg-red-500";
                    const message =
                        rate >= 80 ? `Successfully parsed ${rate}% of your resume. ATS-friendly!` :
                        rate >= 60 ? `Parsed ${rate}%. Some sections may not be ATS-readable.` :
                        `Only ${rate}% of your resume could be parsed. Major formatting or content issues detected.`;
                    const textColor =
                        rate >= 80 ? "text-green-600" :
                        rate >= 60 ? "text-orange-500" :
                        "text-red-500";

                    return (
                        <>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                            <div className={`h-3 rounded-full transition-all duration-300 ${barColor}`} style={{ width: `${rate}%` }} />
                        </div>
                        <p className={`text-sm font-medium mb-4 ${textColor}`}>{message}</p>
                        
                        </>
                    );
                    })()}
                </div>

                {/* RESUME LENGTH */}
                <div className="border border-gray-200 p-6 rounded-lg text-center">
                    <h2 className="text-xl font-bold mb-4 flex justify-center items-center gap-2 text-gray-800">
                    <Hash /> Resume Length
                    </h2>
                    {(() => {
                    const idealMin = 400;
                    const idealMax = 800;
                    const wordCount = result.wordCount;
                    const progress = Math.min(wordCount / 1000, 1) * 100;
                    let barColor = "bg-green-500";
                    let message = `Your resume is within the optimal length (${idealMin}–${idealMax} words).`;
                    let textColor = "text-green-600";

                    if (wordCount < idealMin) {
                        barColor = "bg-orange-400";
                        message = `Your resume has ${wordCount} words. Add more details to reach the optimal range.`;
                        textColor = "text-orange-500";
                    } else if (wordCount > idealMax) {
                        barColor = "bg-orange-400";
                        message = `Your resume has ${wordCount} words. Condense it for better readability.`;
                        textColor = "text-orange-500";
                    }

                    return (
                        <>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                            <div className={`h-3 rounded-full transition-all duration-300 ${barColor}`} style={{ width: `${progress}%` }} />
                        </div>
                        <p className={`font-medium text-sm ${textColor}`}>{message}</p>
                        </>
                    );
                    })()}
                </div>
                </div>
            </div>
            </div>


            {/* KEY INSIGHTS */}
            <div className="bg-white p-6 rounded-xl shadow-sm border mb-7.5">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText /> Key Insights
              </h2>
              <ul className="space-y-2">
                {result.insights.map((tip: string, i: number) => (
                  <li key={i} className="bg-[#ffe6e6] border border-red-200 rounded-md px-4 py-2 text-sm text-red-700">
                    {tip}
                  </li>
                ))}
              </ul>
              <a href="/generate-cv">
                <Button className="bg-primary/80 mt-4 hover:bg-primary/70 text-white">
                    Generate ATS-Friendly CV
                </Button>
              </a>
            </div>

            
            <div className="bg-white p-6 rounded-xl shadow-sm border mb-7.5">
            {/* KEY SUMMARY */}
            <h2 className="text-xl font-bold mb-6 mt-6 flex items-center gap-2 text-gray-800">
                <BookOpen /> Key Summary
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3 bg-gray-100 p-4 rounded-lg">
                <Mail size={18} className="text-blue-600 mt-0.5" />
                <div>
                    <p className="text-gray-600 font-medium">Email</p>
                    <p className="text-gray-800 break-all">{result.email}</p>
                </div>
                </div>

                <div className="flex items-start gap-3 bg-gray-100 p-4 rounded-lg">
                <Phone size={18} className="text-green-600 mt-0.5" />
                <div>
                    <p className="text-gray-600 font-medium">Phone</p>
                    <p className="text-gray-800">{result.phone}</p>
                </div>
                </div>

                <div className="flex items-start gap-3 bg-gray-100 p-4 rounded-lg">
                <Hash size={18} className="text-yellow-600 mt-0.5" />
                <div>
                    <p className="text-gray-600 font-medium">Word Count</p>
                    <p className="text-gray-800">{result.wordCount}</p>
                </div>
                </div>

                <div className="flex items-start gap-3 bg-gray-100 p-4 rounded-lg">
                <Settings2 size={18} className="text-purple-600 mt-0.5" />
                <div>
                    <p className="text-gray-600 font-medium">Skills</p>
                    <p className="text-gray-800">{result.foundSkills.join(", ") || "None"}</p>
                </div>
                </div>

                <div className="flex items-start gap-3 bg-gray-100 p-4 rounded-lg sm:col-span-2">
                <BookOpen size={18} className="text-pink-600 mt-0.5" />
                <div>
                    <p className="text-gray-600 font-medium">Sections</p>
                    <p className="text-gray-800">{result.foundSections.join(", ") || "None"}</p>
                </div>
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <a href="/generate-cv">
                <Button className="bg-primary/80 hover:bg-primary/70 text-white">
                    Generate ATS-Friendly CV
                </Button>
                </a>
            </div>
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
}
