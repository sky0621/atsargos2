import { useEffect, useState } from "react";
import { delItem, Item, listItem } from "../../../../features/item.ts";
import { useAuthContext } from "../../../components/AuthProvider.tsx";
import { UnauthorizedError } from "../../../../lib/error.ts";
import { message } from "antd";

export const useItemList = () => {
  console.info("[useItemList] call");

  const { user } = useAuthContext();
  const [items, setItems] = useState<Item[]>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [item, setItem] = useState<Item>();
  const [error, setError] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

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

  const openEditModal = (item: Item) => {
    console.info("[useItemList][openEditModal] call", item);
    setItem(item);
    setShowEditModal(true);
  };

  const deleteItem = async (item: Item) => {
    console.info("[useItemList][deleteItem] item:", item);
    try {
      const idToken = await user?.getIdToken(true);
      if (!idToken) {
        throw UnauthorizedError;
      }
      await delItem(idToken, item);
      messageApi.info("Success");
    } catch (e) {
      console.error("[useItemList][deleteItem] failed to editItem", e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unexpected error occurred");
      }
    }
  };

  return {
    items,
    showEditModal,
    setShowEditModal,
    openEditModal,
    item,
    deleteItem,
    error,
    contextHolder,
  };
};
