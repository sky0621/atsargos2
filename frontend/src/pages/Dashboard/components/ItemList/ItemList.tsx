import { Card, Flex } from "antd";
import styles from "./styles.module.css";
import { useItemList } from "./useItemList.ts";

const ItemList = () => {
  console.info("ItemList");
  const { items } = useItemList();

  return (
    <Flex data-id="FLEX" wrap="wrap" gap="middle">
      {items?.map((item) => (
        <Card
          data-id="CARD"
          hoverable
          className={styles.card}
          cover={<img alt={item.name} src={item.url} className={styles.img} />}
        >
          <Card.Meta data-id="CARD_META_DATE" title={item.date} />
          <Card.Meta
            data-id="CARD_META"
            title={item.name}
            description={`notify interval: ${item.notify} days`}
          />
        </Card>
      ))}
    </Flex>
  );
};

export default ItemList;
