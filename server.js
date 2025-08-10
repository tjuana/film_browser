import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import fs from 'node:fs';
import compression from 'compression';
import sirv from 'sirv';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Environment configuration
const config = {
  port: process.env.PORT || 5173,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  distPath: resolve(__dirname, 'dist'),
  indexPath: resolve(__dirname, 'index.html'),
  serverEntryPath: resolve(__dirname, 'dist/server/entry-server.js')
};

const app = express();

// Middleware
if (config.isProduction) {
  app.use(compression());
}

// Development mode - serve SPA with fallback
if (!config.isProduction) {
  app.use(express.static('.'));
  
  app.get('*', (req, res) => {
    try {
      const html = fs.readFileSync(config.indexPath, 'utf-8');
      res.send(html);
    } catch (error) {
      console.error('Error reading index.html:', error);
      res.status(500).send('Internal Server Error');
    }
  });
} else {
  // Production mode - SSR with static file serving
  app.use(sirv(config.distPath, { extensions: [] }));
  
  app.get('*', async (req, res) => {
    try {
      const template = fs.readFileSync(resolve(config.distPath, 'index.html'), 'utf-8');
      const { render } = await import(config.serverEntryPath);
      
      const request = new Request(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
      const { html: appHtml, status } = await render(request);
      
      const html = template.replace('<!--app-html-->', appHtml);
      res.status(status).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (error) {
      console.error('SSR Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
}

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
  console.log(`📁 Mode: ${config.isProduction ? 'Production (SSR)' : 'Development (SPA)'}`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
});
