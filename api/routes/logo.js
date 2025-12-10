const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, style, color } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const primaryColor = color || '#3b82f6'; // Default blue
  
  let svgContent = '';
  
  if (style === 'minimal') {
    svgContent = `
      <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="90" height="90" rx="10" stroke="${primaryColor}" stroke-width="4" fill="none" />
        <text x="50" y="65" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="${primaryColor}" text-anchor="middle">${initials}</text>
      </svg>
    `;
  } else if (style === 'neon') {
    svgContent = `
      <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <circle cx="50" cy="50" r="45" stroke="${primaryColor}" stroke-width="2" fill="none" filter="url(#glow)" />
        <text x="50" y="65" font-family="Courier New, monospace" font-size="35" font-weight="bold" fill="#fff" text-anchor="middle" filter="url(#glow)">${initials}</text>
      </svg>
    `;
  } else {
    // Ultimate / Abstract
    svgContent = `
      <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="M50 10 L90 90 L10 90 Z" fill="url(#grad1)" opacity="0.8" />
        <text x="50" y="70" font-family="Verdana, sans-serif" font-size="30" font-weight="bold" fill="white" text-anchor="middle">${initials}</text>
      </svg>
    `;
  }

  res.json({ svg: svgContent });
});

module.exports = router;
