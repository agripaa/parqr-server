import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { getDatabase } from 'firebase-admin/database';
import * as serviceAccount from '../service/esp-32-pkm-kc-firebase-adminsdk-8xpgi-342191fd36.json';

const firebaseConfig = {
  credential: cert(serviceAccount as any),
  databaseURL: 'https://esp-32-pkm-kc-default-rtdb.firebaseio.com',
  storageBucket: 'esp-32-pkm-kc.appspot.com',
};

let app: any;

if (!getApps().length) {
  app = initializeApp(firebaseConfig); // Gunakan firebaseConfig di sini
} else {
  app = getApp();
}

export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const realtimeDatabase = getDatabase(app); 