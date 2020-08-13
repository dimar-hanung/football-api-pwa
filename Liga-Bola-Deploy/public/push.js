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
   "endpoint": "https://fcm.googleapis.com/fcm/send/fx6IQ8t1o3s:APA91bFQMNAWkc4qJULJZQyJ2_83V0MceHaNv54Gle66swouBd3f_HenT8LVSm-JLjdIJTJGE73_TFFRPOVSjWBjyfURuzk4AZHT1_fQ2_8xojCooo39Q4PICSa3ZdK4KuASy3r9M2Rb",
   "keys": {
       "p256dh": "BPVAuo9+Mk9hfN8fAtt7mDI76sm1YRMTPdHePpQvX2OsWj5MRBxwdMKQvnZZN/+ma35B3NQMRVpe1pqea3XcIuo=",
       "auth": "jUj4BLLtbKMjLSeAmAfaWA=="
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