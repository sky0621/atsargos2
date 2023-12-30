import { Alert, Card, Flex } from "antd";
import styles from "./styles.module.css";
import { useItemList } from "./useItemList.ts";
import EditItemModal from "../EditItem/EditItemModal/EditItemModal.tsx";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { MouseEvent } from "react";

const ItemList = () => {
  console.info("[ItemList] call");

  const {
    items,
    showEditModal,
    setShowEditModal,
    openEditModal,
    item,
    deleteItem,
    error,
    contextHolder,
  } = useItemList();

  return (
    <>
      {contextHolder}
      {error && <Alert type="error" message={error} />}
      <EditItemModal
        isOpen={showEditModal}
        setShowEditModal={setShowEditModal}
        item={item}
      />
      <Flex data-id="FLEX" wrap="wrap" gap="middle">
        {items?.map((item, idx) => (
          <Card
            data-id="CARD"
            key={idx}
            hoverable
            className={styles.card}
            actions={[
              <EditOutlined
                key="edit"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  console.info(e);
                  openEditModal(item);
                }}
              />,
              <DeleteOutlined
                key="delete"
                onClick={async (e: MouseEvent<HTMLButtonElement>) => {
                  console.info(e);
                  await deleteItem(item);
                }}
              />,
            ]}
          >
            <Card.Meta data-id="CARD_META_DATE" title={item.date} />
            <Card.Meta
              data-id="CARD_META"
              title={item.name}
              description={`interval: ${item.notify} days`}
            />
          </Card>
        ))}
      </Flex>
    </>
  );
};

export default ItemList;
