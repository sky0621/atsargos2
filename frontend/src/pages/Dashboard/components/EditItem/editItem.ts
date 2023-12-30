import { z } from "zod";

export const EditItemSchema = z.object({
  id: z.string(),
  date: z.string(),
  datePicker: z.any(),
  name: z.string(),
  notify: z.number(),
});

export type EditItemType = z.infer<typeof EditItemSchema>;
