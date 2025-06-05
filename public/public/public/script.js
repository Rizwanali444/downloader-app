function downloadVideo() {
  const url = document.getElementById('videoURL').value.trim();

  if (!url) {
    alert('براہ کرم YouTube ویڈیو کا URL درج کریں۔');
    return;
  }

  const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  if (!youtubeRegex.test(url)) {
    alert('براہ کرم درست YouTube ویڈیو کا URL درج کریں۔');
    return;
  }

  window.location.href = `/api/download?url=${encodeURIComponent(url)}`;
}
