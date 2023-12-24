import { z } from "zod";

export const AddItemSchema = z.object({
  name: z.string(),
});

export type AddItemType = z.infer<typeof AddItemSchema>;
