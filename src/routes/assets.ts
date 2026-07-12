import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

// ARCHITECTURAL WATCH-OUT: You must configure this environment variable in Railway.
// Roblox requires valid authentication to access asset delivery endpoints externally.
const ROBLOX_COOKIE = process.env.ROBLOX_AUTH_COOKIE || '';

/**
 * Raw Asset Proxy (Streams models, meshes, clothing templates directly to frontend/site)
 * Example Usage on Site: <img src="/asset?id=18256037" /> for clothing textures
 */
router.get('/asset', async (req: Request, res: Response) => {
  const assetId = req.query.id;
  if (!assetId || isNaN(Number(assetId))) {
    return res.status(400).json({ error: "Invalid or missing Asset ID." });
  }

  try {
    // Intercept and pipe directly from the Roblox Core Asset Delivery system
    const response = await axios.get(`https://assetdelivery.roblox.com/v1/asset/`, {
      params: { id: assetId },
      headers: {
        'Cookie': `.ROBLOSECURITY=${ROBLOX_COOKIE}`,
        'User-Agent': 'Roblox/WinInet',
        'Accept': '*/*'
      },
      responseType: 'stream'
    });

    // Mirror the exact content-type (e.g., image/png, application/octet-stream)
    res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache locally for 24 hours to preserve bandwidth

    return response.data.pipe(res);
  } catch (error: any) {
    console.error(`[Ziptrii Asset Error] Failed to fetch asset ${assetId}:`, error.message);
    return res.status(500).json({ error: "Failed to resolve CDN asset layer." });
  }
});

/**
 * Batch Thumbnail Proxy for Catalog Displays
 * Seamlessly interfaces with the site's catalog grids to prevent CORS issues
 */
router.get('/v1/thumbnails/assets', async (req: Request, res: Response) => {
  const assetIds = req.query.assetIds as string;
  if (!assetIds) return res.status(400).json({ error: "Missing assetIds parameter." });

  try {
    // Queries Roblox API to resolve correct secure rbxcdn static image links
    const targetUrl = `https://thumbnails.roblox.com/v1/assets?assetIds=${assetIds}&returnPolicy=PlaceHolder&size=420x420&format=Png&isCircular=false`;
    const response = await axios.get(targetUrl);
    
    // Rewrite the real Roblox URLs to point through your local proxy if needed, 
    // or return the direct CDN images to save server computing power.
    return res.json(response.data);
  } catch (error: any) {
    console.error(`[Ziptrii Thumbnail Error]:`, error.message);
    return res.status(500).json({ error: "Failed to map asset thumbnails." });
  }
});

export default router;
