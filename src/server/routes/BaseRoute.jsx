import React from 'react';

import {resolve} from 'path';
import {ChunkExtractor} from '@loadable/server';
import html from 'common-tags/lib/oneLine';
import {renderToString} from 'react-dom/server';
import App from '../../client/pages/App/index';
import {readFileSync} from 'fs';

const htmlTemplate = readFileSync(
  resolve(__dirname, '../../../build/public/index.html'),
).toString();

export default class BaseRoute {
  req;

  res;

  next;

  extractor;

  constructor(req, res, next) {
    Object.assign(this, {req, res, next});
    this.extractor = new ChunkExtractor(req.app.get('loadableOptions'));
  }

  async render() {
    return this.renderToString(this.extractor.collectChunks(<App />));
  }


  async renderToString(
    entry,
  ) {
    const content = await renderToString(
      <div id="root" data-shmid="page-root">
        {entry}
      </div>
    );

    let result = htmlTemplate
      .replace('<div id="root" data-shmid="page-root"></div>', content)

    return html` ${result} `;
  }


  static asMiddleware() {
    return async (req, res, next) => {
      console.info(`${this.name} at ${req.originalUrl}`);

      const route = new this(req, res, next);

      let rendered;

      try {
        rendered = await route.render();
      } catch (e) {
        console.error("Error in render", e);
      }

      return res.status(200).send(rendered);
    };
  }
}
