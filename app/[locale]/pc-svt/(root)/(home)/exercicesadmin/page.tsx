"use client";

import React, { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { storage } from '@/lib/firebaseUtils';
import PDFViewer from '@/components/PDFViewer';

const AdminPage = () => {
  const [files, setFiles] = useState<{ name: string, url: string }[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      const storageRef = ref(storage, 'exercicespcsvt/');
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

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    const file = event.target.files?.[0];
    if (file) {
      const storageRef = ref(storage, `exercicespcsvt/${file.name}`);
      await uploadBytes(storageRef, file);
      const newFileUrl = await getDownloadURL(storageRef);
      setFiles([...files, { name: file.name, url: newFileUrl }]);
    }
    setUploading(false);
  };

  const handleDelete = async (fileUrl: string) => {
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
    setFiles(files.filter(file => file.url !== fileUrl));
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      <input 
        type="file" 
        onChange={handleUpload} 
        disabled={uploading} 
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file, index) => (
          <div key={index} className="pdf-item flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4">
            <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mb-2">{file.name}</a>
            <button 
              onClick={() => handleDelete(file.url)} 
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
            <PDFViewer fileUrl={file.url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
