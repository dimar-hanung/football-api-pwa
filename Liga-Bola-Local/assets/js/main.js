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
                        console.log(
                          "Berhasil melakukan subscribe dengan endpoint: ",
                          subscribe.endpoint
                        );
                        console.log(
                          "Berhasil melakukan subscribe dengan p256dh key: ",
                          btoa(
                            String.fromCharCode.apply(
                              null,
                              new Uint8Array(subscribe.getKey("p256dh"))
                            )
                          )
                        );
                        console.log(
                          "Berhasil melakukan subscribe dengan auth key: ",
                          btoa(
                            String.fromCharCode.apply(
                              null,
                              new Uint8Array(subscribe.getKey("auth"))
                            )
                          )
                        );
                      })
                      .catch(function (e) {
                        console.error("Tidak dapat melakukan subscribe ", e.message);
                      });
                  });
              }
            });
          });
        }
      }
      
      // function showNotifikasiSederhana() {
      //   const title = "Notifikasi Sederhana";
      //   const options = {
      //     body: "Ini adalah konten notifikasi. \nBisa menggunakan baris Gambar",
      //     icon: "./assets/images/logo-web-dimar.png",
      //     requireInteraction: true,
      //   };
      //   if (Notification.permission === "granted") {
      //     navigator.serviceWorker.ready.then(function (registration) {
      //       if ("PushManager" in window) {
      //         navigator.serviceWorker.getRegistration().then(function (registration) {
                
      //           registration.pushManager
      //             .subscribe({
      //               userVisibleOnly: true,
      //               applicationServerKey: urlBase64ToUint8Array(
      //                 "BNes13mYyWyR08ugL09gMoDgq679dMtQeq7oPnpT7RYLUxH7vfgGAdXvi0OsItOaPp3k7ptq4LYIw1um6WOxn1c"
      //               ),
      //             })
      //             .then(function (subscribe) {
      //               console.log(
      //                 "Berhasil melakukan subscribe dengan endpoint: ",
      //                 subscribe.endpoint
      //               );
      //               console.log(
      //                 "Berhasil melakukan subscribe dengan p256dh key: ",
      //                 btoa(
      //                   String.fromCharCode.apply(
      //                     null,
      //                     new Uint8Array(subscribe.getKey("p256dh"))
      //                   )
      //                 )
      //               );
      //               console.log(
      //                 "Berhasil melakukan subscribe dengan auth key: ",
      //                 btoa(
      //                   String.fromCharCode.apply(
      //                     null,
      //                     new Uint8Array(subscribe.getKey("auth"))
      //                   )
      //                 )
      //               );
      //             })
      //             .catch(function (e) {
      //               console.error("Tidak dapat melakukan subscribe ", e.message);
      //             });
      //         });
      //       }
      //       registration.showNotification(title, options);
      //     });
      //   } else {
      //     console.error("FItur notifikasi tidak diijinkan.");
      //   }
      // }

   
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