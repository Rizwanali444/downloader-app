const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static('public'));

app.get('/api/download', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "URL required" });

  if (!ytdl.validateURL(url)) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  try {
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);

    ytdl(url, {
      filter: 'audioandvideo',
      quality: 'highest',
    }).pipe(res);
  } catch (err) {
    res.status(500).json({ error: "Failed to download video", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
