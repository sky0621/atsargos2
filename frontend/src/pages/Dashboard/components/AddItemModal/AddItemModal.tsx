import { Modal } from "antd";
import { useAddItemModal } from "./useAddItemModal.ts";
import { Dispatch, SetStateAction } from "react";

type Props = {
  isOpen: boolean;
  setShowAddModal: Dispatch<SetStateAction<boolean>>;
};

const AddItemModal = (props: Props) => {
  const { addItem, closeModal } = useAddItemModal(props.setShowAddModal);
  return (
    <Modal
      open={props.isOpen}
      title="Add Item"
      onOk={addItem}
      onCancel={closeModal}
    >
      xx
    </Modal>
  );
};

export default AddItemModal;
