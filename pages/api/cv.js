import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // CV file path (update this to your actual CV file)
    const cvPath = path.join(process.cwd(), 'public', 'Petar-Arsic-CV.pdf');
    
    // Check if CV file exists
    if (!fs.existsSync(cvPath)) {
      return res.status(404).json({ error: 'CV not found' });
    }

    // Get file stats
    const stat = fs.statSync(cvPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      // Handle range requests for streaming
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(cvPath, { start, end });
      
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'application/pdf',
      };
      
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      // Full file download
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Petar-Arsic-CV.pdf"',
        'Cache-Control': 'no-cache',
      };
      
      res.writeHead(200, head);
      
      // Log download for analytics
      const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'];
      const timestamp = new Date().toISOString();
      
      console.log(`CV downloaded by ${clientIP} at ${timestamp}`, {
        ip: clientIP,
        userAgent,
        timestamp,
        referer: req.headers.referer || 'direct'
      });

      // Stream the file
      const file = fs.createReadStream(cvPath);
      file.pipe(res);
    }

  } catch (error) {
    console.error('CV API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
