/*eslint spaced-comment: ["error", "never"]*/
/*eslint func-names: ["error", "never"]*/

const APP_PREFIX = "kumo_app";
const VERSION = "version_01";
const CACHE_NAME = APP_PREFIX + VERSION;
const URLS = [
  "manifest.json",
  "index.html",
  "txt/robots.txt",
  "images/favicon.ico",
  "images/logo192.png",
  "images/logo512.png",
];

/*eslint-disable-next-line no-restricted-globals */
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS);
    })
  );
});

/*eslint-disable-next-line no-restricted-globals */
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
