import { memo, useState, useCallback } from 'react';
import { optimizeImageProps } from '../utils/performance';

/**
 * Optimized image component with lazy loading and error handling
 * Provides better performance and user experience
 */
const OptimizedImage = memo(({ 
  src, 
  alt, 
  className = '', 
  style = {},
  fallbackSrc = '/default-avatar.png',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  }, [fallbackSrc, imageSrc]);

  const optimizedProps = optimizeImageProps(imageSrc, alt, {
    className: `${className} ${isLoading ? 'opacity-50' : 'opacity-100'} transition-opacity duration-200`,
    style,
    onLoad: handleLoad,
    onError: handleError,
    ...props
  });

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full" />
      )}
      <img {...optimizedProps} />
      {hasError && (
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center rounded-full">
          <span className="text-gray-500 text-xs">?</span>
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;

