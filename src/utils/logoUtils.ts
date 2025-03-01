/**
 * Utility functions for generating HomeFax logo SVGs
 */

/**
 * Generate an SVG string for the HomeFax logo
 * @param isDarkMode Whether to use dark mode colors
 * @param size The size of the SVG (width and height will be equal)
 * @returns SVG string
 */
export const generateLogoSvg = (isDarkMode: boolean, size: number): string => {
  // Colors for both themes
  const gradientColors = isDarkMode
    ? { primary: "#4FACFE", secondary: "#00E676" }
    : { primary: "#2A5082", secondary: "#4FACFE" };

  const groundColor = isDarkMode ? "#00E676" : "#4FACFE";

  return `<svg width="${size}" height="${size}" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${gradientColors.primary}"/>
        <stop offset="100%" stop-color="${gradientColors.secondary}"/>
      </linearGradient>
      <linearGradient id="groundGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${gradientColors.primary}" stop-opacity="0.2"/>
        <stop offset="50%" stop-color="${groundColor}" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="${gradientColors.primary}" stop-opacity="0.2"/>
      </linearGradient>
    </defs>
    
    <!-- House outline -->
    <path d="M30,10 L60,30 L60,60 L0,60 L0,30 Z" fill="url(#houseGradient)"/>
    
    <!-- Chimney -->
    <rect x="45" y="15" width="10" height="15" fill="url(#houseGradient)"/>
    
    <!-- Door (transparent white) -->
    <rect x="22.5" y="35" width="15" height="25" fill="${isDarkMode ? "white" : "#E1E4E8"}" fill-opacity="${isDarkMode ? "0.15" : "0.5"}"/>
    
    <!-- Windows (transparent white) -->
    <rect x="10" y="35" width="10" height="10" fill="${isDarkMode ? "white" : "#E1E4E8"}" fill-opacity="${isDarkMode ? "0.15" : "0.5"}"/>
    <rect x="40" y="35" width="10" height="10" fill="${isDarkMode ? "white" : "#E1E4E8"}" fill-opacity="${isDarkMode ? "0.15" : "0.5"}"/>
    
    <!-- Ground/Hill -->
    <path d="M-10,60 Q30,40 70,60" fill="none" stroke="url(#groundGradient)" stroke-width="5"/>
  </svg>`;
};

/**
 * Convert an SVG string to a data URL
 * @param svgString The SVG string to convert
 * @returns Data URL
 */
export const svgToDataUrl = (svgString: string): string => {
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};

/**
 * Create an Image element from an SVG string
 * @param svgString The SVG string to convert
 * @returns Promise that resolves with an Image element
 */
export const svgToImage = (svgString: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = svgToDataUrl(svgString);
  });
};

/**
 * Convert an SVG string to a canvas
 * @param svgString The SVG string to convert
 * @param width The width of the canvas
 * @param height The height of the canvas
 * @returns Promise that resolves with a canvas element
 */
export const svgToCanvas = async (
  svgString: string,
  width: number,
  height: number
): Promise<HTMLCanvasElement> => {
  const img = await svgToImage(svgString);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.drawImage(img, 0, 0, width, height);
  }
  return canvas;
};

/**
 * Convert an SVG string to a PNG data URL
 * @param svgString The SVG string to convert
 * @param width The width of the PNG
 * @param height The height of the PNG
 * @returns Promise that resolves with a PNG data URL
 */
export const svgToPngDataUrl = async (
  svgString: string,
  width: number,
  height: number
): Promise<string> => {
  const canvas = await svgToCanvas(svgString, width, height);
  return canvas.toDataURL("image/png");
};
