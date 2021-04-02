if (!("serviceWorker" in navigator)) {
} else {
  navigator.serviceWorker
    .register("../service-worker.js")
    .then(function(registration) {
    })
    .catch(function(error) {
    });
}