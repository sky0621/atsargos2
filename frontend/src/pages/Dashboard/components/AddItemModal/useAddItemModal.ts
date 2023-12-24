import { Dispatch, SetStateAction } from "react";

export const useAddItemModal = (
  setShowAddModal: Dispatch<SetStateAction<boolean>>,
) => {
  const addItem = () => {
    alert("addItem");
  };

  const closeModal = () => {
    setShowAddModal(false);
  };

  return { addItem, closeModal };
};
