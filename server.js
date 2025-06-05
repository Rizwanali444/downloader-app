const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());

app.use(express.static('public')); // Serve frontend files

// Demo download endpoint (backend logic yahan aayega)
app.get('/api/download', (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({error: "URL required"});
  // Yahan real downloader logic (yt-dlp ya kisi API) lagani hoti hai
  res.json({ message: "Download requested for: " + url });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
