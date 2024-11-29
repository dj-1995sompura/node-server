const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

// Define a POST route for the proxy
app.post('/proxy', async (req, res) => {
  try {
    // Forward the data to the external API
    const response = await axios.post('https://postman-echo.com/post', req.body);

    // Send the response from the external API back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error forwarding request:', error.message);
    res.status(500).send('Failed to forward request.');
  }
});

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
