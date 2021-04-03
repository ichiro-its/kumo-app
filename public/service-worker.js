/*eslint spaced-comment: ["error", "never"]*/
/*eslint func-names: ["error", "never"]*/

const APP_PREFIX = "kumo_app";
const VERSION = "version_01";
const CACHE_NAME = APP_PREFIX + VERSION;
const URLS = [
  "/kumo-app/",
  "/kumo-app/index.html",
  "/kumo-app/manifest.json",
  "/kumo-app/txt/robots.txt",
  "/kumo-app/images/favicon.ico",
  "/kumo-app/images/logo192.png",
  "/kumo-app/images/logo512.png",
];

/*eslint-disable-next-line no-restricted-globals */
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        return request;
      } else {
        return fetch(e.request);
      }
    })
  );
});

/*eslint-disable-next-line no-restricted-globals */
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS);
    })
  );
});

/*eslint-disable-next-line no-restricted-globals */
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      const cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });

      cacheWhitelist.push(CACHE_NAME);

      return Promise.all(
        keyList.map(function (key, i) {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});
