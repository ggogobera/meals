if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = require('./express-app');

// During development react-app is hosted standalone
if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  app.use(express.static(path.join(__dirname, './react-app/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './react-app/build/index.html'));
  });
}

/**
 * App startup
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
