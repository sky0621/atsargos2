import { useEffect, useState } from "react";
import { Item, listItem } from "../../../../features/item.ts";
import { useAuthContext } from "../../../components/AuthProvider.tsx";
import { UnauthorizedError } from "../../../../lib/error.ts";

export const useItemList = () => {
  console.info("[useItemList] call");

  const { user } = useAuthContext();
  const [items, setItems] = useState<Item[]>();

  useEffect(() => {
    (async () => {
      console.info("[useItemList][useEffect] call");
      const idToken = await user?.getIdToken(true);
      if (!idToken) {
        throw UnauthorizedError;
      }
      try {
        const items = await listItem(idToken);
        console.info("[useItemList][useEffect] items", items);
        setItems(items);
      } catch (e) {
        console.error("[useItemList][useEffect] failed to listItem", e);
        throw e;
      }
    })();
  }, []);

  return { items };
};
