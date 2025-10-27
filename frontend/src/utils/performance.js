/**
 * Performance monitoring utilities
 * Helps track and optimize app performance
 */

/**
 * Measures the time taken to execute a function
 * @param {Function} fn - Function to measure
 * @param {string} name - Name for the measurement
 * @returns {any} The result of the function
 */
export const measurePerformance = (fn, name) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();

  return result;
};

/**
 * Measures the time taken to execute an async function
 * @param {Function} fn - Async function to measure
 * @param {string} name - Name for the measurement
 * @returns {Promise<any>} The result of the function
 */
export const measureAsyncPerformance = async (fn, name) => {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();

  return result;
};

/**
 * Creates a throttled function that only executes at most once per delay
 * @param {Function} func - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, delay) => {
  let timeoutId;
  let lastExecTime = 0;

  return function (...args) {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

/**
 * Creates a debounced function that delays execution until after delay has passed
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

/**
 * Optimizes image loading with lazy loading and error handling
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text
 * @param {Object} options - Additional options
 * @returns {Object} Image props
 */
export const optimizeImageProps = (src, alt, options = {}) => ({
  src,
  alt,
  loading: "lazy",
  decoding: "async",
  ...options,
});

/**
 * Checks if the device is mobile for performance optimizations
 * @returns {boolean} True if mobile device
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Gets optimal settings based on device capabilities
 * @returns {Object} Performance settings
 */
export const getPerformanceSettings = () => {
  const mobile = isMobile();

  return {
    // Reduce animation complexity on mobile
    enableAnimations: !mobile,
    // Use smaller debounce delays on mobile for better responsiveness
    debounceDelay: mobile ? 150 : 300,
    // Enable virtualization for large lists on mobile
    enableVirtualization: mobile,
    // Reduce image quality on mobile for faster loading
    imageQuality: mobile ? 0.8 : 1.0,
  };
};
