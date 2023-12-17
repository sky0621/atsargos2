import { Avatar, Col, Row } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Items } from "../../item.ts";

type Props = {
  items: Items | undefined;
};

const DashboardPage = (props: Props) => {
  return (
    <>
      <Row justify="start" align="middle">
        <Col>
          <Avatar icon={<PlusCircleOutlined />} />
        </Col>
      </Row>
      {props.items?.map((item, idx) => <Col key={idx}>{item.name}</Col>)}
    </>
  );
};

export default DashboardPage;
