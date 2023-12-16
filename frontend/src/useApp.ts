import { useState } from "react";
import { firebaseAuth, provider } from "./main.tsx";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useCookies } from "react-cookie";
import { DateTime } from "luxon";
import { Item, Items, listItem } from "./item.ts";
import { ID_TOKEN_COOKIE_KEY } from "./constants.ts";

export const useApp = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [_, setCookie] = useCookies([ID_TOKEN_COOKIE_KEY]);
  const [items, setItems] = useState<Item[]>();

  const login = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.info(credential);
      setCookie(ID_TOKEN_COOKIE_KEY, credential?.idToken, {
        expires: DateTime.now().plus({ days: 7 }).toJSDate(),
      });
    } catch (e) {
      console.error(e);
      return;
    }
    setLoggedIn(true);

    try {
      const items: Items = await listItem();
      setItems(items);
    } catch (e) {
      console.error(e);
    }
  };

  return { loggedIn, login, items };
};
