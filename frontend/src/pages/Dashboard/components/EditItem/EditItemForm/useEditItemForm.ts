import { EditItemSchema } from "../editItem.ts";
import { editItem } from "../../../../../features/item.ts";
import { useState } from "react";
import { useAuthContext } from "../../../../components/AuthProvider.tsx";
import { UnauthorizedError } from "../../../../../lib/error.ts";
import { DatePickerProps, FormInstance, message } from "antd";

export const useEditItemForm = (
  form: FormInstance,
  onFinishEnd: () => void,
) => {
  console.info("[useEditItemForm] call");

  const { user } = useAuthContext();
  const [error, setError] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const onDateChanged: DatePickerProps["onChange"] = (_, dateString) => {
    form.setFieldValue("date", dateString);
  };

  const onFinish = async (values: never) => {
    console.info("[useEditItemForm][onFinish] values:", values);
    const item = EditItemSchema.parse(values);
    console.info("[useEditItemForm][onFinish] item:", item);
    try {
      const idToken = await user?.getIdToken(true);
      if (!idToken) {
        throw UnauthorizedError;
      }
      await editItem(idToken, item);
      messageApi.info("Success");
      onFinishEnd();
    } catch (e) {
      console.error("[useEditItemForm][onFinish] failed to editItem", e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unexpected error occurred");
      }
    }
  };

  return { onDateChanged, onFinish, error, contextHolder };
};
