import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const firebaseAuth = getAuth(firebaseApp);

export const provider = new GoogleAuthProvider();
export type GoogleCredential = {
  idToken: string | undefined;
  signInMethod: string | undefined;
  secret: string | undefined;
  accessToken: string | undefined;
  providerId: string | undefined;
};

export const signInByGoogle = async (): Promise<GoogleCredential> => {
  const result = await signInWithPopup(firebaseAuth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  return {
    idToken: credential?.idToken,
    signInMethod: credential?.signInMethod,
    secret: credential?.secret,
    accessToken: credential?.accessToken,
    providerId: credential?.providerId,
  };
};
