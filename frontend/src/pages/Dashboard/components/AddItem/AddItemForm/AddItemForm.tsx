import { Alert, DatePicker, Form, FormInstance, Input } from "antd";
import { useAddItemForm } from "./useAddItemForm.ts";
import SubmitButton from "../../SubmitButton/SubmitButton.tsx";

type Props = {
  form: FormInstance;
  onFinishEnd: () => void;
};

const AddItemForm = (props: Props) => {
  console.info("[AddItemForm] call");

  const { onDateChanged, onFinish, error, contextHolder } = useAddItemForm(
    props.form,
    props.onFinishEnd,
  );

  return (
    <>
      {contextHolder}
      {error && <Alert type="error" message={error} />}
      <Form
        data-id="ADD_ITEM_FORM"
        form={props.form as unknown as FormInstance<never>}
        name="AddItemForm"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          data-id="FORM_ITEM_NAME"
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          data-id="FORM_ITEM_DATE_PICKER"
          label="Date"
          name="datePicker"
          rules={[{ required: true, message: "Please input date!" }]}
        >
          <DatePicker format="YYYY-MM-DD" onChange={onDateChanged} />
        </Form.Item>
        <Form.Item
          data-id="FORM_ITEM_NOTIFY"
          label="Notify"
          name="notify"
          rules={[{ required: true, message: "Please input notify!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item data-id="FORM_ITEM_DATE" name="date">
          <Input hidden />
        </Form.Item>
        <Form.Item date-id="FORM_ITEM_SUBMIT">
          <SubmitButton form={props.form} />
        </Form.Item>
      </Form>
    </>
  );
};

export default AddItemForm;
