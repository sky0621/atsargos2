import { Alert, Button, Form, Input } from "antd";
import { useAddItemForm } from "./useAddItemForm.ts";

type Props = {
  onFinishEnd: () => void;
};

const AddItemForm = (props: Props) => {
  const { onFinish, error, contextHolder } = useAddItemForm(props.onFinishEnd);

  return (
    <>
      {contextHolder}
      {error && <Alert type="error" message={error} />}
      <Form name="AddItemForm" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please input date!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Notify"
          name="notify"
          rules={[{ required: true, message: "Please input notify!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddItemForm;
