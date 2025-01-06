import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import credential from '../../credential.json';

const app = initializeApp({
   credential: cert(credential as ServiceAccount)
});

export const db = getFirestore(app);