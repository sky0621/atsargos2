import { useState } from "react";

export const useDashboard = () => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  return {
    showAddModal,
    setShowAddModal,
  };
};
