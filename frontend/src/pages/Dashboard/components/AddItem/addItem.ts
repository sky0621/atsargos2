import { z } from "zod";

export const AddItemSchema = z.object({
  date: z.string(),
  datePicker: z.any(),
  name: z.string(),
  notify: z.string(),
});

export type AddItemType = z.infer<typeof AddItemSchema>;
