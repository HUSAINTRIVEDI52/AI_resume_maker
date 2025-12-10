const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Routes
const enhanceRoutes = require('./routes/enhance');
const logoRoutes = require('./routes/logo');
const generateRoutes = require('./routes/generate');

app.use('/api/enhance', enhanceRoutes);
app.use('/api/logo', logoRoutes);
app.use('/api/generate', generateRoutes);

app.get('/', (req, res) => {
  res.send('AI Personal Brand Builder API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
