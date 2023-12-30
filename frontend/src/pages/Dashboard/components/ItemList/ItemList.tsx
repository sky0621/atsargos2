import { Card, Flex } from "antd";
import styles from "./styles.module.css";
import { useItemList } from "./useItemList.ts";

const ItemList = () => {
  console.info("[ItemList] call");

  const { items } = useItemList();

  return (
    <Flex data-id="FLEX" wrap="wrap" gap="middle">
      {items?.map((item, idx) => (
        <Card data-id="CARD" key={idx} hoverable className={styles.card}>
          <Card.Meta data-id="CARD_META_DATE" title={item.date} />
          <Card.Meta
            data-id="CARD_META"
            title={item.name}
            description={`interval: ${item.notify} days`}
          />
        </Card>
      ))}
    </Flex>
  );
};

export default ItemList;
