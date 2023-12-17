import { useEffect, useState } from "react";
import { firebaseAuth, provider } from "./main.tsx";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useCookies } from "react-cookie";
//import { DateTime } from "luxon";
import { Item, Items, listItem } from "./item.ts";
import { ID_TOKEN_COOKIE_KEY } from "./constants.ts";

export const useApp = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [_, setCookie] = useCookies([ID_TOKEN_COOKIE_KEY]);
  const [items, setItems] = useState<Item[]>();

  // MEMO: local frontend 確認用の措置
  useEffect(() => {
    setLoggedIn(true);
    setItems([
      {
        id: "56A50FAC-F459-48A8-8594-1B050AE620BC",
        name: "item01",
        date: "2023-10-10",
        notify: 1702712940,
      },
      {
        id: "E859C8B3-8F9A-4591-A77C-02803C1DBAFD",
        name: "item02",
        date: "2023-10-15",
        notify: 1702713466,
      },
      {
        id: "E7028926-69F0-4C5B-B147-2B0C16ECA6F2",
        name: "item03",
        date: "2023-10-20",
        notify: 1702713521,
      },
      {
        id: "BCA751BE-4458-458D-854C-463F65521632",
        name: "item04",
        date: "2023-10-25",
        notify: 1702713603,
      },
      {
        id: "B94CAD26-4107-4C6A-9128-0D033A5A9364",
        name: "item05",
        date: "2023-10-30",
        notify: 1702713647,
      },
    ]);
  }, []);

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

    try {
      const items: Items = await listItem();
      setItems(items);
    } catch (e) {
      console.error(e);
    }
  };

  return { loggedIn, login, items };
};
