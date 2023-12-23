import ItemList from "./components/ItemList/ItemList.tsx";
import AddItemButton from "./components/AddItemButton/AddItemButton.tsx";

const DashboardPage = () => {
  console.info("DashboardPage");
  return (
    <>
      <AddItemButton />
      <ItemList />
    </>
  );
};

export default DashboardPage;
