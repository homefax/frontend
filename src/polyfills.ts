// Polyfills for Node.js core modules
import "process";
import "buffer";

// Make sure process and Buffer are available globally
window.process = window.process || {};
window.Buffer = window.Buffer || {};

// Add any other polyfills needed here
