import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getApp, getApps, initializeApp } from "firebase/app";
import { FirebaseError } from "@firebase/util";

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
  console.info("[signInByGoogle] call");
  try {
    const result = await signInWithPopup(firebaseAuth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    return {
      idToken: credential?.idToken,
      signInMethod: credential?.signInMethod,
      secret: credential?.secret,
      accessToken: credential?.accessToken,
      providerId: credential?.providerId,
    };
  } catch (e) {
    if (e instanceof FirebaseError) {
      console.log("[signInByGoogle] got FirebaseError", e);
    } else {
      console.log("[signInByGoogle] got UnexpectedError", e);
    }
    throw e;
  }
};

export const signOutByGoogle = async () => {
  console.info("[signOutByGoogle] call");
  try {
    await signOut(firebaseAuth);
  } catch (e) {
    if (e instanceof FirebaseError) {
      console.log("[signOutByGoogle] got FirebaseError", e);
    } else {
      console.log("[signOutByGoogle] got UnexpectedError", e);
    }
    throw e;
  }
};
