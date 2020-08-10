importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

// development builds
// workbox.setConfig({ debug: true });

// productions build
workbox.setConfig({ debug: false });

if (workbox) {
  console.log("[WORKBOX] SUCCESSFULLY TO LOADED");

  // CHACHE NAME
  workbox.core.setCacheNameDetails({
    prefix: "Liga-Bola",
    suffix: "",
    precache: "appshell",
    runtime: "runtime",
  });

  workbox.precaching.precacheAndRoute(
    [
      { url: "/", revision: "1" },
      { url: "/index.html", revision: "1" },
      { url: "/assets/js/api.js", revision: "1" },
      { url: "/assets/js/competitions.js", revision: "1" },
      { url: "/assets/js/main.js", revision: "1" },
      { url: "/assets/js/materialize.min.js", revision: "1" },
      { url: "/assets/js/nav.js", revision: "1" },
      { url: "/assets/js/standings.js", revision: "1" },
      { url: "/assets/js/teams.js", revision: "1" },
      { url: "/assets/js/schedule.js", revision: "1" },
      { url: "/assets/css/style.css", revision: "1" },
      { url: "/assets/css/materialize.min.css", revision: "1" },
      { url: "/assets/icons/favicon-16x16.png", revision: "1" },
      { url: "/assets/icons/favicon-32x32.png", revision: "1" },
      { url: "/assets/icons/favicon.ico", revision: "1" },
      { url: "/assets/images/bg-home-bola.png", revision: "1" },
      { url: "/assets/images/logo-web-dimar.png", revision: "1" },
      { url: "/assets/images/watching-television.jpg", revision: "1" },
      { url: "/icon.png", revision: "1" },
      { url: "/manifest-icon-192.png", revision: "1" },
      { url: "/manifest-icon-512.png", revision: "1" },
      { url: "/manifest.json", revision: "1" },
    ],
    {
      // Ignore all URL parameters.
      ignoreUrlParametersMatching: [/.*/],
    }
  );

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: "liga-images",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "liga-pages",
    })
  );

  workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
    workbox.strategies.staleWhileRevalidate()
  );
} else {
  console.log("[WORKBOX] FAILED TO LOADED");
}


self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: ",/assets/iamges/logo-web-dimar.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
