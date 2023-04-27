/* eslint-disable import/dynamic-import-chunkname */
/* eslint-disable @typescript-eslint/no-var-requires */
import http from 'http';
import util from 'util';
import createApp from './server';
import get from 'lodash/get';
import dotenv from 'dotenv';

dotenv.config();

process.on('SIGINT', () => {
  console.error('SIGINT, shutting down process');
  process.exit(0);
});

async function startup() {
  const port = get(process.env, 'PORT');

  let app = await createApp();

  const httpServer = http.createServer(app);

  const listen = util.promisify(httpServer.listen.bind(httpServer));

  await listen({port, host: process.env.HOST});

  console.info('🎧  App listening on port %s', port); }

startup();
