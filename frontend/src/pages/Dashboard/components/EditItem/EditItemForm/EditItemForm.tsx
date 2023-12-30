import {
  Alert,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
} from "antd";
import { useEditItemForm } from "./useEditItemForm.ts";
import SubmitButton from "../../SubmitButton/SubmitButton.tsx";
import { Item } from "../../../../../features/item.ts";

type Props = {
  form: FormInstance;
  onFinishEnd: () => void;
  item: Item;
};

const EditItemForm = (props: Props) => {
  console.info("[EditItemForm] call");

  const { onDateChanged, onFinish, error, contextHolder } = useEditItemForm(
    props.form,
    props.onFinishEnd,
  );

  return (
    <>
      {contextHolder}
      {error && <Alert type="error" message={error} />}
      <Form
        data-id="EDIT_ITEM_FORM"
        form={props.form as unknown as FormInstance<never>}
        name="EditItemForm"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          id: props.item.id,
          name: props.item.name,
          date: props.item.date,
          notify: props.item.notify,
        }}
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
          <InputNumber />
        </Form.Item>
        <Form.Item data-id="FORM_ITEM_DATE" name="date">
          <Input hidden />
        </Form.Item>
        <Form.Item data-id="FORM_ITEM_ID" name="id">
          <Input hidden />
        </Form.Item>
        <Form.Item date-id="FORM_ITEM_SUBMIT">
          <SubmitButton form={props.form} />
        </Form.Item>
      </Form>
    </>
  );
};

export default EditItemForm;
