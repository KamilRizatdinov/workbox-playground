import express from 'express';
import BaseRoute from './routes/BaseRoute'
import ManifestRoute from './routes/ManifestRoute'
import path from 'path'

async function createApp() {
  const app = express();

  const PUBLIC_DIR = './build/public';

  app.set('loadableOptions', {
    statsFile: path.resolve(process.cwd(), './build/loadable-stats.json'), 
    entrypoints: ['client']
  });

  app.use(express.static(PUBLIC_DIR, {index: false}));
  app.use(express.urlencoded({extended: false}));
  app.use(
    '/manifest.json',
    ManifestRoute.asMiddleware(),
  );

  app.use('/', BaseRoute.asMiddleware());

  return app;
}

export default createApp;
