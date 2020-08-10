const CACHE_NAME = "codepolitan-reader-lite-v1";
 
var urlsToCache = ["/",
 "/index.html",
 "/assets/js/api.js",
 "/assets/js/competitions.js",
 "/assets/js/main.js",
 "/assets/js/materialize.min.js",
 "/assets/js/nav.js",
 "/assets/js/standings.js",
 "/assets/js/teams.js",
 "/assets/js/schedule.js",
 "/assets/css/style.css",
 "/assets/css/materialize.min.css",
 "/assets/images/bg-home-bola.png",
 "/assets/images/logo-web-dimar.png",
 "/assets/images/watching-television.jpg",
 "/icon.png",
 "/manifest-icon-192.png",
 "/manifest-icon-512.png",
 "/manifest.json",
];
 
self.addEventListener("install", function(event) {
  console.log("ServiceWorker: Menginstall..");
 
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("ServiceWorker: Membuka cache..");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, {cacheName:CACHE_NAME})
    .then(function(response) {
      if (response) {
        return response;
      }
      var fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(
        function(response) {
          if(!response || response.status !== 200) {
            return response;
          }
          var responseToCache = response.clone();
          caches.open(CACHE_NAME)
          .then(function(cache) {
            cache.put(event.request, responseToCache);
          });
          return response;
        }
      );
    })
  );
});

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: ',/assets/iamges/logo-web-dimar.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
