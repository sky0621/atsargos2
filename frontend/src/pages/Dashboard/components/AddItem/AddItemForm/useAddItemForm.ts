import { AddItemSchema } from "../addItem.ts";
import { addItem } from "../../../../../features/item.ts";
import { useState } from "react";
import { getIdTokenFromCookie } from "../../../../../lib/cookie.ts";

export const useAddItemForm = () => {
  console.info("[useAddItemForm] start");
  const [error, setError] = useState("");
  const idToken = getIdTokenFromCookie();

  const onFinish = async (values: any) => {
    const item = AddItemSchema.parse(values);
    console.info("[useAddItemForm][onFinish] item:", item);
    try {
      await addItem(idToken, item);
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unexpected error occurred");
      }
    }
  };

  return { onFinish, error };
};
