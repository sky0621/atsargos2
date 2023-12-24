import { Dispatch, SetStateAction } from "react";

export const useAddItemButton = (
  setShowAddModal: Dispatch<SetStateAction<boolean>>,
) => {
  const addItem = () => {
    setShowAddModal(true);
  };

  return {
    addItem,
  };
};
