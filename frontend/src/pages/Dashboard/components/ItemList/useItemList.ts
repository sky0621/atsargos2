import { useEffect, useState } from "react";
import { Item, listItem } from "../../../../features/item.ts";
import { useAuthContext } from "../../../components/AuthProvider.tsx";

export const useItemList = () => {
  const { user } = useAuthContext();
  const [items, setItems] = useState<Item[]>();

  useEffect(() => {
    (async () => {
      const idToken = await user?.getIdToken();
      if (!idToken) {
        throw new Error();
      }
      setItems(await listItem(idToken));
    })();
  }, []);

  return { items };
};
