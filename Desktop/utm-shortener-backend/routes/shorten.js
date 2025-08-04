import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.post('/', async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: '缺少 longUrl' });

  const api = `https://api.pics.ee/v1/links?access_token=${encodeURIComponent(process.env.PICSEE_TOKEN)}`; // 官方要求 token 放 query string:contentReference[oaicite:3]{index=3}

  const picseeRes = await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ url: longUrl })
  });

  const data = await picseeRes.json();
console.log('PicSee status:', picseeRes.status);
console.log('PicSee response:', data);
  if (!picseeRes.ok) return res.status(picseeRes.status).json(data);
  res.json({ shortUrl: data.data.picseeUrl });
});

export default router;
