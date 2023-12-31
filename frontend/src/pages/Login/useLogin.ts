import { signInByGoogle } from "../../lib/firebase.ts";

export const useLogin = () => {
  //  const [_, setCookie] = useCookies([ID_TOKEN_COOKIE_KEY]);

  const login = async () => {
    try {
      await signInByGoogle();
      //const credential = await signInByGoogle();
      //setCookie(ID_TOKEN_COOKIE_KEY, credential?.idToken);
      //      setCookie(ID_TOKEN_COOKIE_KEY, credential?.idToken, {
      //        expires: DateTime.now().plus({ days: 7 }).toJSDate(),
      //      });
    } catch (e) {
      console.error(e);
      return;
    }
  };

  return { login };
};
