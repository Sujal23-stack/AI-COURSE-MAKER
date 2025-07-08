// components/LoadingModal.jsx
import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const LoadingModal = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <AiOutlineLoading3Quarters className="animate-spin text-purple-500 text-4xl mx-auto mb-3" />
        <p className="text-gray-800 text-lg font-medium">Generating course content...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
