"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.realtimeDatabase = exports.storage = exports.firestore = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const storage_1 = require("firebase-admin/storage");
const database_1 = require("firebase-admin/database");
const serviceAccount = require("../service/esp-32-pkm-kc-firebase-adminsdk-8xpgi-342191fd36.json");
const firebaseConfig = {
    credential: (0, app_1.cert)(serviceAccount),
    databaseURL: 'https://esp-32-pkm-kc-default-rtdb.firebaseio.com',
    storageBucket: 'esp-32-pkm-kc.appspot.com',
};
let app;
if (!(0, app_1.getApps)().length) {
    app = (0, app_1.initializeApp)(firebaseConfig);
}
else {
    app = (0, app_1.getApp)();
}
exports.firestore = (0, firestore_1.getFirestore)(app);
exports.storage = (0, storage_1.getStorage)(app);
exports.realtimeDatabase = (0, database_1.getDatabase)(app);
//# sourceMappingURL=firebase.config.js.map