import * as admin from 'firebase-admin';
import serviceAccount from './firesbaseConfig.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  });
}

const db = admin.firestore();

export { admin, db };
