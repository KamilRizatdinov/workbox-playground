/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
import {precacheAndRoute} from 'workbox-precaching/precacheAndRoute';
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {clientsClaim} from 'workbox-core';

precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();
clientsClaim();

registerRoute(
  new RegExp(/\.(png|gif|jpe?g|svg|ico|woff2?|webp|map)$/),
  new StaleWhileRevalidate({
    cacheName: 'media',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);
