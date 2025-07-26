import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

const ResponsiveImage = ({ 
  src, 
  alt, 
  className = '', 
  fallback = null,
  loading = 'lazy',
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  if (imageError) {
    return (
      fallback || (
        <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
          <ImageOff className="h-8 w-8 text-gray-400" />
        </div>
      )
    );
  }

  return (
    <div className="relative">
      {imageLoading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 ${className}`}>
          <div className="animate-pulse bg-gray-200 w-full h-full rounded"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading={loading}
        {...props}
      />
    </div>
  );
};

export default ResponsiveImage;