import { get } from "./api.ts";
import { z } from "zod";
import { toError } from "./error.ts";

export const ItemSchema = z.object({
  id: z.string(),
  date: z.string(),
  name: z.string(),
  notify: z.number(),
});

export type Item = z.infer<typeof ItemSchema>;

export const ItemsSchema = z.array(ItemSchema);

export type Items = z.infer<typeof ItemsSchema>;

export const listItem = async (): Promise<Items> => {
  let response: Response;
  try {
    response = await get("/item");
    console.info(response);
    if (response.ok) {
      return ItemsSchema.parse(response.body);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
  throw toError(response);
};
