import { Avatar } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import { useAddItemButton } from "./useAddItemButton.ts";

const AddItemButton = () => {
  console.info("AddItemButton");
  const {} = useAddItemButton();
  return (
    <Avatar
      icon={<PlusCircleOutlined />}
      onClick={}
      className={styles.avatar}
    />
  );
};

export default AddItemButton;
