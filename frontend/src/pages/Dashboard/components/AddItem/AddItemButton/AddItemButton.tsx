import { Avatar } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import styles from "./styles.module.css";
import { useAddItemButton } from "./useAddItemButton.ts";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setShowAddModal: Dispatch<SetStateAction<boolean>>;
};

const AddItemButton = (props: Props) => {
  console.info("AddItemButton");
  const { addItem } = useAddItemButton(props.setShowAddModal);

  return (
    <Avatar
      data-id="ADD_ITEM_BUTTON_AVATAR"
      icon={<PlusCircleTwoTone />}
      onClick={addItem}
      className={styles.avatar}
    />
  );
};

export default AddItemButton;
