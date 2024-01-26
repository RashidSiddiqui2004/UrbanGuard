
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 border-r-4 h-16 w-16"></div>
    </div>
  );
};

export default LoadingSpinner;
