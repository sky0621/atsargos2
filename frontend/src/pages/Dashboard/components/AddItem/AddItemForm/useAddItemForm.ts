import { AddItemSchema } from "../addItem.ts";
import { addItem } from "../../../../../features/item.ts";
import { useState } from "react";
import { useAuthContext } from "../../../../components/AuthProvider.tsx";
import { UnauthorizedError } from "../../../../../lib/error.ts";
import { DatePickerProps, FormInstance, message } from "antd";

export const useAddItemForm = (form: FormInstance, onFinishEnd: () => void) => {
  console.info("[useAddItemForm] call");

  const { user } = useAuthContext();
  const [error, setError] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const onDateChanged: DatePickerProps["onChange"] = (_, dateString) => {
    form.setFieldValue("date", dateString);
  };

  const onFinish = async (values: never) => {
    console.info("[useAddItemForm][onFinish] values:", values);
    const item = AddItemSchema.parse(values);
    console.info("[useAddItemForm][onFinish] item:", item);
    try {
      const idToken = await user?.getIdToken(true);
      if (!idToken) {
        throw UnauthorizedError;
      }
      await addItem(idToken, item);
      messageApi.info("Success");
      onFinishEnd();
    } catch (e) {
      console.error("[useAddItemForm][onFinish] failed to addItem", e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unexpected error occurred");
      }
    }
  };

  return { onDateChanged, onFinish, error, contextHolder };
};
