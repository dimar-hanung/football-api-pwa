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
   "endpoint": "https://fcm.googleapis.com/fcm/send/epeF38i6J_M:APA91bHFQU4BB-W0Mjy9847gH8_SmggdOGk_XlXlJJgh4VqGJVLFXhiALK0I9Y1o5pe33znLASW6cpn-2ZeLGriUSHbC1-F3AGF02lf-CXVZbjsFLx9NciC-6c1m0fDpdc-T5DTaT_F8",
   "keys": {
       "p256dh": "BJ1kKuR8v2GIGsLH96U9E46/5hz334v09oRpnCrORvaKgUDqbD3t3zsrrh3bfcASQ9KWI2bfO0FmB/J/Xj+nI2o=",
       "auth": "GgBIzGpng0ay/XJn8F+5Kw=="
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
.then(res => console.log(res))
.catch(err => console.log(err));