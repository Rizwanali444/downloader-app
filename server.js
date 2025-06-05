const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();

app.use(cors());
app.use(express.static('public'));

app.get('/api/download', async (req, res) => {
  const videoURL = req.query.url;
  if (!videoURL || !ytdl.validateURL(videoURL)) {
    return res.status(400).json({ error: 'درست YouTube URL فراہم کریں۔' });
  }

  try {
    const info = await ytdl.getInfo(videoURL);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);

    ytdl(videoURL, {
      filter: 'audioandvideo',
      quality: 'highest'
    }).pipe(res);
  } catch (err) {
    console.error('ڈاؤنلوڈ میں خرابی:', err);
    res.status(500).json({ error: 'ویڈیو ڈاؤنلوڈ نہیں ہو سکی۔' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`سرور چل رہا ہے: http://localhost:${PORT}`));
