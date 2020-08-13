Demo : https://dimar-push-bb9b6.web.app/
# Update Submission 2
## Push.js
- Regenerate Key , fix auth
- Menambah then dan catch pada
    ```javascript
    webPush.sendNotification(
    pushSubscription,
    payload,
    options
    )
    .then(res => res)
    .catch(err => console.log(err));
    ```
    Supaya dapat jelas mengetahui pesan error yang diterima

## Icon
- Menambah tag apple splash screen, dan variasi icon

## Note for me
- Masalah kemarin hanyalah kurang teliti, contoh kasus kurang teliti
    1. Sudah melakukan ` web-push generate-vapid-keys --json` tapi  `pushSubscription keys` belum diganti / masih menggunakan key yang lama karena tersimpan di cache
    1. sudah melakukan keduanya, lupa yang di `applicationServerKey` belum di sesuaikan

- jadi total yang diubah setelah generate key ulang adalah 6
    1. vapid key = 2
    1. endpoint = 1
    1. key p256dh + auth = 2
    1. applicationServerKey = 1


# Update Sumbission 3 - Menerapkan Saran dari review sebelum nya
## Mengapus Komentar 
1. main.js
1. api.js

## db-controller.js
- Mengganti add menjadi put saat melakukan insert data, 
karena jika tidak melakukan pengecekan bahwa data sudah disimpan, maka add() akan memunculkan pesan error. Sedangkan put() akan me-replace existing data jika sudah ada.

## Menerapkan tiga karakter komparasi ,
- bertujuan membandingkan tipe datanya juga

# Update Submission 3 - Fix Work Box
- Menambah semua cache yang tertinggal
- [x] Offline mode
- [x] PWA shortcut