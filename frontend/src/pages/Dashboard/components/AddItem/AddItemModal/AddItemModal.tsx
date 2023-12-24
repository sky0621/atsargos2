import { Modal } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import AddItemForm from "../AddItemForm/AddItemForm.tsx";
import styles from "./styles.module.css";

type Props = {
  isOpen: boolean;
  setShowAddModal: Dispatch<SetStateAction<boolean>>;
};

const AddItemModal = (props: Props) => {
  const onCancel = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.setShowAddModal(false);
  };

  return (
    <Modal
      open={props.isOpen}
      title="Add Item"
      okText=""
      okButtonProps={{ disabled: true, className: styles.none }}
      cancelText=""
      cancelButtonProps={{ disabled: true, className: styles.none }}
      onCancel={onCancel}
      closable={true}
      maskClosable={true}
    >
      <AddItemForm />
    </Modal>
  );
};

export default AddItemModal;
