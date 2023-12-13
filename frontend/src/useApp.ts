import { useState } from "react";
import { firebaseAuth, provider } from "./main.tsx";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useCookies } from "react-cookie";
import { DateTime } from "luxon";

export const useApp = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [_, setCookie] = useCookies(["atsargos2-id-token"]);
  const login = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.info(credential);
      setCookie("atsargos2-id-token", credential?.idToken, {
        expires: DateTime.now().plus({ days: 7 }).toJSDate(),
      });
    } catch (e) {
      console.error(e);
      return;
    }
    setLoggedIn(true);
  };

  return { loggedIn, login };
};
