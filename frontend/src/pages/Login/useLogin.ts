import { Dispatch, SetStateAction } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth, provider } from "../../main.tsx";
import { ID_TOKEN_COOKIE_KEY } from "../../lib/constants.ts";
import { useCookies } from "react-cookie";

export const useLogin = (setLoggedIn: Dispatch<SetStateAction<boolean>>) => {
  const [_, setCookie] = useCookies([ID_TOKEN_COOKIE_KEY]);

  const login = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      //      console.info(credential);
      //      setCookie(ID_TOKEN_COOKIE_KEY, credential?.idToken, {
      //        expires: DateTime.now().plus({ days: 7 }).toJSDate(),
      //      });
      setCookie(ID_TOKEN_COOKIE_KEY, credential?.idToken);
    } catch (e) {
      console.error(e);
      return;
    }
    setLoggedIn(true);
  };

  return { login };
};
