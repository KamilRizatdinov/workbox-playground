import React from 'react'; import {hydrate} from 'react-dom';
import {Workbox} from 'workbox-window';
import App from './pages/App';
import {loadableReady} from '@loadable/component';
import isomorphicFetch from 'isomorphic-fetch'
import Meta from './contexts/Meta'

async function init() {
  const {
    version: serverVersion,
  } = await isomorphicFetch(`/manifest.json`).then(res => res.json());

  hydrate(
    <Meta.Provider serverVersion={serverVersion}>
      <App />
    </Meta.Provider>,
    document.getElementById('root'),
  );

  try {
    const wb = new Workbox('/sw.js');

    wb.addEventListener('activated', _ => {
      window.location.reload();
    });

    wb.register();
  } catch (e) {
    console.error("Error during SW installation!", e);
  }
}

loadableReady(init);
