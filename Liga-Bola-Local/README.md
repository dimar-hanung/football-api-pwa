# Update
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

## Coming soon Update
Untuk Submisisi 3 sepertinya saya akan membuat fungsi detail team berjalan, untuk saat ini belum berjalan karena keterbatasan waktu , terima kasih