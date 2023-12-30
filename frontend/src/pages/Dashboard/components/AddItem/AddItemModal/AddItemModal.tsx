import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";
import AddItemForm from "../AddItemForm/AddItemForm.tsx";
import styles from "./styles.module.css";
import { useAddItemModal } from "./useAddItemModal.ts";

type Props = {
  isOpen: boolean;
  setShowAddModal: Dispatch<SetStateAction<boolean>>;
};

const AddItemModal = (props: Props) => {
  console.info("[AddItemModal] call");

  const { form, onCancel, onFinishEnd } = useAddItemModal(
    props.setShowAddModal,
  );

  return (
    <Modal
      data-id="ADD_ITEM_MODAL"
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
      <AddItemForm form={form} onFinishEnd={onFinishEnd} />
    </Modal>
  );
};

export default AddItemModal;
