'use client';

import React from 'react';
// import { PhotoIcon } from '@heroicons/react/24/solid';

function Profile() {
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      alert("No file selected.");
      return;
    }

    const password = prompt('Please enter your password to continue:');
    if (!password) {
      alert("Password required.");
      return;
    }

    console.log('Uploading file:', file.name, file.type);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert('Upload successful!');
        console.log('File URL:', data.url);
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-900 min-h-screen text-white">
      <h2 className="text-lg font-semibold mb-4">Upload a Cover Photo</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-6 text-white block w-full max-w-sm border border-white rounded px-3 py-2 bg-gray-800"
      />

      <button
        className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
        onClick={() => console.log('Delete clicked')}
      >
        Delete Cover Photo
      </button>
    </div>
  );
}

export default Profile;
