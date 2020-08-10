var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BLRz81dDseJ2_6Xk8Ss6vQQbPY3Q6oWLPKnLsr60O50Xdg7pUzslrXCqSxi_KxOyxkv27ewLHNg2nQYSz7N-bsI",
   "privateKey": "f2H-Vg8Lwn0IyecuA_-LTGlYWFy_WaQ42-mmqrvFz1I"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fb0zQB5Lwxo:APA91bH8TNkaJ1RGRKRo_6bK2gdmnPNUYlUH79zsupJTA8xq3UDjKLWY2-shLHqqcIawr3aXdrNcm_BJdyLfTs4MVi2smanIaeBLYB_IU2g3RQPiB2c4k9bUSvWdo7Ag4PrUt9duCjAf",
   "keys": {
       "p256dh": "BKfap+8jSDc1PfZaClDrSMgYLlLR8+KkYK+S7i6730099Umx9770RSzZ1mEZINScwWv1eeujCEpMzBR8AvFTOv0=",
       "auth": "/NKlygtFTa9jmgLknL0YPg=="
   }
};
var payload = 'Selamat! Liga bola siap menanti anda !';
 
var options = {
   gcmAPIKey: '245635778674',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
)
.then(res => res)
.catch(err => console.log(err));