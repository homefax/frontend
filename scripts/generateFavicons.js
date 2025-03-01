const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const { JSDOM } = require('jsdom');
const { DOMParser } = new JSDOM().window;

// Create directories if they don't exist
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate SVG for dark theme (used for favicon)
function generateLogoSvg(size) {
  // Colors for dark theme
  const primary = "#4FACFE";
  const secondary = "#00E676";
  const groundColor = "#00E676";

  return `<svg width="${size}" height="${size}" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${primary}"/>
        <stop offset="100%" stop-color="${secondary}"/>
      </linearGradient>
      <linearGradient id="groundGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${primary}" stop-opacity="0.2"/>
        <stop offset="50%" stop-color="${groundColor}" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="${primary}" stop-opacity="0.2"/>
      </linearGradient>
    </defs>
    
    <!-- House outline -->
    <path d="M30,10 L60,30 L60,60 L0,60 L0,30 Z" fill="url(#houseGradient)"/>
    
    <!-- Chimney -->
    <rect x="45" y="15" width="10" height="15" fill="url(#houseGradient)"/>
    
    <!-- Door (transparent white) -->
    <rect x="22.5" y="35" width="15" height="25" fill="white" fill-opacity="0.15"/>
    
    <!-- Windows (transparent white) -->
    <rect x="10" y="35" width="10" height="10" fill="white" fill-opacity="0.15"/>
    <rect x="40" y="35" width="10" height="10" fill="white" fill-opacity="0.15"/>
    
    <!-- Ground/Hill -->
    <path d="M-10,60 Q30,40 70,60" fill="none" stroke="url(#groundGradient)" stroke-width="5"/>
  </svg>`;
}

// Save SVG to file
function saveSvgToFile(svgString, filePath) {
  fs.writeFileSync(filePath, svgString);
  console.log(`Saved SVG to ${filePath}`);
}

// Convert SVG to PNG and save
async function saveSvgAsPng(svgString, filePath, width, height) {
  try {
    // Parse SVG
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');

    // Create canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Load SVG as image
    const svgBuffer = Buffer.from(svgString);
    const img = await loadImage(`data:image/svg+xml;base64,${svgBuffer.toString('base64')}`);

    // Draw image to canvas
    ctx.drawImage(img, 0, 0, width, height);

    // Save canvas as PNG
    const pngBuffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filePath, pngBuffer);
    console.log(`Saved PNG to ${filePath}`);
  } catch (error) {
    console.error('Error converting SVG to PNG:', error);
  }
}

// Generate favicon.ico (use a library or external tool for this)
// For simplicity, we'll just copy the PNG for now
function generateFavicon() {
  console.log('Note: For a proper favicon.ico, use a tool like https://realfavicongenerator.net/');
  console.log('For now, we\'ll just use the PNG as favicon');
}

// Main function to generate all favicons
async function generateFavicons() {
  // Generate SVG
  const svgLogo = generateLogoSvg(512);

  // Save SVG
  const svgPath = path.join(publicDir, 'logo.svg');
  saveSvgToFile(svgLogo, svgPath);

  // Save PNGs
  await saveSvgAsPng(svgLogo, path.join(publicDir, 'logo192.png'), 192, 192);
  await saveSvgAsPng(svgLogo, path.join(publicDir, 'logo512.png'), 512, 512);
  await saveSvgAsPng(svgLogo, path.join(publicDir, 'favicon.png'), 64, 64);

  // Generate favicon.ico (simplified)
  generateFavicon();

  console.log('Favicon generation complete!');
  console.log('To create a proper favicon.ico file, upload the favicon.png to a service like https://realfavicongenerator.net/');
}

// Run the main function
generateFavicons().catch(console.error);