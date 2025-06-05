const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const path = require('path');
const app = express();
app.use(cors());

app.use(express.static('public'));

app.get('/api/download', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({error: "URL required"});
  if (!ytdl.validateURL(url)) {
    return res.status(400).json({error: "Invalid YouTube URL"});
  }
  res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  ytdl(url, { format: 'mp4' }).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
