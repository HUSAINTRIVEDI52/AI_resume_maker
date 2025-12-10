const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { 
    personalInfo, 
    skills, 
    projects, 
    socials, 
    theme, 
    templates,
    logo 
  } = req.body;

  // Validate required fields
  if (!personalInfo || !personalInfo.name) {
    return res.status(400).json({ error: 'Personal info is required' });
  }

  // Construct the final portfolio object
  // In a real app, this might save to a database or generate static files
  const portfolioData = {
    meta: {
      generatedAt: new Date().toISOString(),
      version: '1.0.0',
      theme: theme || 'modern'
    },
    content: {
      personalInfo: {
        ...personalInfo,
        // Ensure defaults
        tagline: personalInfo.tagline || 'Building digital experiences that matter.',
        about: personalInfo.about || 'I am a passionate creator focused on crafting world-class user experiences. With a deep love for design and engineering, I build products that solve real problems and delight users.'
      },
      skills: skills || [],
      projects: projects || [],
      socials: socials || {},
      logo: logo || null
    },
    config: {
      templates: templates || {
        hero: 'default',
        about: 'default',
        projects: 'grid',
        contact: 'simple'
      }
    }
  };

  res.json(portfolioData);
});

module.exports = router;
