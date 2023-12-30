import { Form } from "antd";
import React, { Dispatch, SetStateAction } from "react";

export const useEditItemModal = (
  setShowEditModal: Dispatch<SetStateAction<boolean>>,
) => {
  console.info("[useEditItemModal] call");

  const [form] = Form.useForm();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onCancel = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    form.resetFields();
    setShowEditModal(false);
  };

  const onFinishEnd = () => {
    form.resetFields();
    setShowEditModal(false);
  };

  return { form, onCancel, onFinishEnd };
};
