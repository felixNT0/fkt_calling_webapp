import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  if (process.env.NODE_ENV === "production") {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n").replace(/^"|"$/g, "")
          : undefined,
      }),
    });
  } else {
    const serviceAccount = require("../../calling-app-8ea6c-firebase-adminsdk-rxpej-e482fa2fa1.json");

    initializeApp({
      credential: cert(serviceAccount),
    });
  }
}

const db = getFirestore();
export { db };
