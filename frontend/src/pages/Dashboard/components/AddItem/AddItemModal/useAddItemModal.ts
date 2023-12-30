import { Form } from "antd";
import React, { Dispatch, SetStateAction } from "react";

export const useAddItemModal = (
  setShowAddModal: Dispatch<SetStateAction<boolean>>,
) => {
  console.info("[useAddItemModal] call");

  const [form] = Form.useForm();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onCancel = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    form.resetFields();
    setShowAddModal(false);
  };

  const onFinishEnd = () => {
    form.resetFields();
    setShowAddModal(false);
  };

  return { form, onCancel, onFinishEnd };
};
