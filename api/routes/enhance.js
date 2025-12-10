const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { text, type } = req.body;

  // Mock AI enhancement
  // In a real app, this would call OpenAI/Gemini
  
  let enhancedText = text;
  
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  if (type === 'tagline') {
    const adjectives = ['Professional', 'Innovative', 'Creative', 'Experienced', 'Passionate'];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    enhancedText = `${randomAdj} ${text} | Building the Future`;
  } else if (type === 'about') {
    enhancedText = `${text} With a passion for cutting-edge technology and a drive for excellence, I transform ideas into reality. My journey is defined by continuous learning and impactful contributions.`;
  } else {
    enhancedText = `[Enhanced] ${text}`;
  }

  // Simulate delay
  setTimeout(() => {
    res.json({ enhancedText });
  }, 1000);
});

module.exports = router;
