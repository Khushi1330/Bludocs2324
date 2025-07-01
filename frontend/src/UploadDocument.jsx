// UploadDocument.jsx
import React, { useState } from 'react';

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setMessage('');

    setTimeout(() => {
      setUploading(false);
      setMessage(`✅ "${file.name}" uploaded successfully!`);
      setFile(null);
    }, 2000);
  };

  return (
    <div className="mt-20 mb-16 px-4 flex justify-center">
      <div className="glass-effect card-modern p-8 rounded-3xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Upload a Document
        </h2>

        <div className="space-y-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100 transition duration-300"
          />

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="btn-modern w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {uploading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="loading w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Uploading...</span>
              </div>
            ) : (
              <span>Upload Document</span>
            )}
          </button>

          {message && (
            <div className="text-center text-sm text-green-600 font-medium mt-4 animate-pulse">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
