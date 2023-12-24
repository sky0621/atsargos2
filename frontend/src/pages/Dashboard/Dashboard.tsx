import ItemList from "./components/ItemList/ItemList.tsx";
import { useDashboard } from "./useDashboard.ts";
import AddItemModal from "./components/AddItem/AddItemModal/AddItemModal.tsx";
import AddItemButton from "./components/AddItem/AddItemButton/AddItemButton.tsx";

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
