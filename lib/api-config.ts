/**
 * API Configuration
 * Handles API URL detection for both development and production
 */

// Get API URL from environment variable or detect automatically
export function getApiUrl(): string {
  // If explicitly set, use it
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // In production (browser), try to detect from current origin
  if (typeof window !== 'undefined') {
    // If we're on a Render domain, construct backend URL
    const hostname = window.location.hostname;
    
    // Render.com pattern: https://your-app.onrender.com
    if (hostname.includes('onrender.com')) {
      // Try to construct backend URL from frontend URL
      // If frontend is at parfumex-frontend.onrender.com
      // Backend might be at parfumex-backend.onrender.com
      const frontendUrl = window.location.origin;
      const backendUrl = frontendUrl.replace('frontend', 'backend').replace('parfumex-frontend', 'parfumex-backend');
      
      // Only use if it's different from frontend (to avoid infinite loops)
      if (backendUrl !== frontendUrl) {
        return backendUrl;
      }
    }
    
    // If on same domain, use relative URLs
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return ''; // Use relative URLs in production
    }
  }

  // Default to localhost for development
  return 'http://localhost:3001';
}

export const API_URL = getApiUrl();


