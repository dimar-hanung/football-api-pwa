
if (!("serviceWorker" in navigator)) {
  console.error("ServiceWorker: Browser tidak mendukung.");
} else {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function(registration) {
      console.log(
        "ServiceWorker: Pendaftaran berhasil. Scope:",
        requestPermission(),
        registration.scope
      );
    })
    .catch(function(error) {
      console.error("ServiceWorker: Pendaftaran gagal. Error:", error);
    });
}


      // Meminta ijin menggunakan Notification API
      function requestPermission() {
        if ("Notification" in window) {
          Notification.requestPermission().then(function (result) {
            if (result === "denied") {
              console.log("Fitur notifikasi tidak diijinkan.");
              return;
            } else if (result === "default") {
              console.error("Pengguna menutup kotak dialog permintaan ijin.");
              return;
            }

            let dataKey = {}

            class DynamicKey {
              static getEndpoint(endpoint){
                dataKey.endpoint = endpoint
                return endpoint
              }

              static get_p256dh(key){
                dataKey.p256dh = key
                return key
              }

              static getAuth(key){
                dataKey.auth = key
                return key
              }

            }
      
            navigator.serviceWorker.ready.then(() => {
              if ("PushManager" in window) {
                navigator.serviceWorker
                  .getRegistration()
                  .then(function (registration) {
                    registration.pushManager
                      .subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(
                          "BLRz81dDseJ2_6Xk8Ss6vQQbPY3Q6oWLPKnLsr60O50Xdg7pUzslrXCqSxi_KxOyxkv27ewLHNg2nQYSz7N-bsI"
                        ),
                      })
                      .then(function (subscribe) {
                        
                          DynamicKey.getEndpoint(subscribe.endpoint)
                          DynamicKey.get_p256dh(btoa(
                            String.fromCharCode.apply(
                              null,
                              new Uint8Array(subscribe.getKey("p256dh"))
                            )
                          ))
                          DynamicKey.getAuth(btoa(
                            String.fromCharCode.apply(
                              null,
                              new Uint8Array(subscribe.getKey("auth"))
                            )
                          ))
                        console.log(dataKey)
                      })
                      .catch(function (e) {
                        console.error("Tidak dapat melakukan subscribe ", e.message);
                      });
                  });
              }
            });
          });

          return "Done"

        }
      }
      
     
   
      function urlBase64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
          .replace(/-/g, "+")
          .replace(/_/g, "/");
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      }