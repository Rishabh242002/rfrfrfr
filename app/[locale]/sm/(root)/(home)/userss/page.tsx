"use client";

import React, { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebaseUtils';
import ProtectedPagesm from '@/components/Protectedpagesm';

const UserPage = () => {
  const [files, setFiles] = useState<{ name: string, url: string }[]>([]);
  const [currentFile, setCurrentFile] = useState<{ name: string, url: string } | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      const storageRef = ref(storage, 'pdfs/');
      const result = await listAll(storageRef);
      const urlPromises = result.items.map(async item => ({
        name: item.name,
        url: await getDownloadURL(item)
      }));
      const files = await Promise.all(urlPromises);
      setFiles(files);
    };
    fetchFiles();
  }, []);

  const handleViewFile = (file: { name: string, url: string }) => {
    setCurrentFile(file);
  };

  const handleBackToList = () => {
    setCurrentFile(null);
  };

  return (
    <ProtectedPagesm>
    <div className="container mx-auto p-6 bg-gradient-to-r from-[#508C9B] to-[#87CEEB] rounded-lg shadow-2xl">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-white">courses</h1>
      
      {currentFile ? (
        <div className="flex flex-col items-center">
          <button 
            onClick={handleBackToList}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Back to List
          </button>
          <div className="border rounded shadow-lg p-4 mb-4 bg-white overflow-hidden w-full">
            <iframe
              src={currentFile.url}
              width="100%"
              height="600px"
              className="border rounded-lg shadow-md"
              style={{ minHeight: '500px' }}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file, index) => (
            <div 
              key={index} 
              className="pdf-item flex flex-col items-center bg-white rounded-lg shadow-lg p-4 transform transition-transform hover:scale-105"
            >
              <a 
                href="#" 
                onClick={() => handleViewFile(file)}
                className="text-blue-600 hover:underline mb-4"
              >
                {file.name}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
 </ProtectedPagesm>
  );
};

export default UserPage;
