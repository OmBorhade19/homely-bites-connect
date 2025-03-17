
// A simple utility to load the Google Maps API script dynamically

// This would ideally use an API key from environment variables
// For demo purposes, we're using a placeholder
const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY';

export const loadGoogleMapsApi = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if the script is already loaded
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    // Setup callbacks
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Maps API'));

    // Add script to document
    document.head.appendChild(script);
  });
};
