var APP_PREFIX = "kumo_app";
var VERSION = "version_01";
var CACHE_NAME = APP_PREFIX + VERSION;
var URLS = [
  "/kumo-app/",
  "/kumo-app/index.html",
  "/kumo-app/manifest.json",
  "/kumo-app/txt/robots.txt",
  "/kumo-app/images/favicon.ico",
  "/kumo-app/images/logo192.png",
  "/kumo-app/images/logo512.png",
];

return request || fetch(e.request);

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("installing cache : " + CACHE_NAME);
      return cache.addAll(URLS);
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });

      cacheWhitelist.push(CACHE_NAME);

      return Promise.all(
        keyList.map(function (key, i) {
          if (cacheWhitelist.indexOf(key) === -1) {
            console.log("deleting cache : " + keyList[i]);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});
