import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.css";
import { useEditItemModal } from "./useEditItemModal.ts";
import EditItemForm from "../EditItemForm/EditItemForm.tsx";
import { Item } from "../../../../../features/item.ts";

type Props = {
  isOpen: boolean;
  setShowEditModal: Dispatch<SetStateAction<boolean>>;
  item: Item | undefined;
};

const EditItemModal = (props: Props) => {
  console.info("[EditItemModal] call");

  const { form, onCancel, onFinishEnd } = useEditItemModal(
    props.setShowEditModal,
  );

  if (!props.item) {
    return null;
  }

  return (
    <Modal
      data-id="EDIT_ITEM_MODAL"
      open={props.isOpen}
      title="Edit Item"
      okText=""
      okButtonProps={{ disabled: true, className: styles.none }}
      cancelText=""
      cancelButtonProps={{ disabled: true, className: styles.none }}
      onCancel={onCancel}
      closable={true}
      maskClosable={true}
    >
      <EditItemForm form={form} onFinishEnd={onFinishEnd} item={props.item} />
    </Modal>
  );
};

export default EditItemModal;
