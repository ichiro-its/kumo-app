const CACHE_NAME = "kumo-app";
const urlsToCache = [
.."/",
.."/LICENSE",
.."/manifest.json",
.."/package.json",
.."/README.md",
.."/yarn.lock",
.."/public/images/favicon.ico",
.."/public/images/logo192.png",
.."/public/images/logo512.png",
.."/public/js/script.js",
.."/public/txt/robots.txt",
.."/public/index.html",
.."/src/components/examples/index.js",
.."/src/components/examples/SimpleClientNode.jsx",
.."/src/components/examples/SimplePublisherNode.jsx",
.."/src/components/examples/SimpleServiceNode.jsx",
.."/src/components/examples/SimpleSubscriptionNode.jsx",
.."/src/components/BoxedCircularProgress.jsx",
.."/src/components/index.js",
.."/src/components/LoggerProvider.jsx",
.."/src/components/SessionProvider.jsx",
.."/src/components/TitledCard.jsx",
.."/src/hooks/node/index.js",
.."/src/hooks/node/useClient.js",
.."/src/hooks/node/useNode.js",
.."/src/hooks/node/usePublisher.js",
.."/src/hooks/node/useService.js",
.."/src/hooks/node/useSubscription.js",
.."/src/hooks/index.js",
.."/src/hooks/UseHandleProcess.js",
.."/src/hooks/UseLogger.js",
.."/src/hooks/UseSession.js",
.."/src/hooks/UseStateOnce.js",
.."/src/hooks/UseStoreState.js",
.."/src/App.jsx",
.."/src/index.jsx"
];

self.addEventListener("install", function(event) {
 
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {

      if (response) {
        return response;
      }
      
      return fetch(event.request);
    })
  );
});