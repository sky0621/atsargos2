import { z } from "zod";

export const DeleteItemSchema = z.object({
  id: z.string(),
});

export type DeleteItemType = z.infer<typeof DeleteItemSchema>;
