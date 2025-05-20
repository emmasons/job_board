'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { toBase64 } from '@/lib/toBase64';

const CvModal = ({ onClose, onAutofill }) => {
  const [step, setStep] = useState(1); // Step 1: choose, Step 2: upload
  const [cvFile, setCvFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!cvFile) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const fileData = await toBase64(cvFile);
      const res = await axios.post('/api/generate-professional-cv', {
        fileName: cvFile.name,
        fileType: cvFile.type,
        fileData,
        additional_info: jobDesc,
      });

      if (res.data.success) {
        onAutofill(res.data);
        onClose();
      } else {
        setError(res.data.error || 'Parsing failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('An error occurred while uploading');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(5px)' }}>
      <div className="bg-white rounded-2xl w-full max-w-3xl p-6 relative" style={{ boxShadow: '0 5px 40px rgba(0, 0, 0, 0.2)' }} >

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>

        {step === 1 && (
          <div className="text-center">
            {/* Illustration */}
            <div className="flex justify-center mb-4">
              <img
                src="/cvmakerillustration.png"
                alt="CV Illustration"
                className=" h-auto"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              Are you Uploading a Current CV?
            </h2>
            <p className="text-gray-600 mb-6">
              We’ll personalize your CV in just a few steps.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setStep(2)}
                className="bg-green-300 hover:bg-green-100 text-black font-semibold px-6 py-2 rounded-full"
              >
                Yes
              </button>
              <button
                onClick={onClose}
                className="border border-gray-400 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-100"
              >
                Skip
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <>
            <h2 className="text-lg font-semibold mb-4 text-center">
              Upload Your CV
            </h2>
            
            {/* Styled File Input */}
            <label className="block w-full mb-4">
              <span className="text-sm text-gray-600">Upload file (.pdf or .docx)</span>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                className="mt-2 w-full block text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0 file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </label>

            {/* Styled Textarea */}
            <textarea
              placeholder="Paste job description (optional)"
              className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />

            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={onClose}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm"
              >
                Skip
              </button>
              <button
                onClick={handleUpload}
                disabled={loading}
                className="bg-primary/70 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                {loading ? 'Processing...' : 'Upload CV'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

};

export default CvModal;
