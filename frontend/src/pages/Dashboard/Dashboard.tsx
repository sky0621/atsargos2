import ItemList from "./components/ItemList/ItemList.tsx";
import AddItemButton from "./components/AddItemButton/AddItemButton.tsx";
import { useDashboard } from "./useDashboard.ts";
import AddItemModal from "./components/AddItemModal/AddItemModal.tsx";

const DashboardPage = () => {
  console.info("DashboardPage");
  const { showAddModal, setShowAddModal } = useDashboard();

  return (
    <>
      <AddItemModal isOpen={showAddModal} setShowAddModal={setShowAddModal} />
      <AddItemButton setShowAddModal={setShowAddModal} />
      <ItemList />
    </>
  );
};

export default DashboardPage;
