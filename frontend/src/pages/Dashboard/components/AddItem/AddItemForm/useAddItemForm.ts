import { AddItemSchema } from "../addItem.ts";
import { addItem } from "../../../../../features/item.ts";
import { useState } from "react";
import { useAuthContext } from "../../../../components/AuthProvider.tsx";
import { UnauthorizedError } from "../../../../../lib/error.ts";

export const useAddItemForm = () => {
  console.info("[useAddItemForm] start");
  const { user } = useAuthContext();
  const [error, setError] = useState("");

  const onFinish = async (values: any) => {
    const item = AddItemSchema.parse(values);
    console.info("[useAddItemForm][onFinish] item:", item);
    try {
      const idToken = await user?.getIdToken();
      if (!idToken) {
        throw UnauthorizedError;
      }
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
