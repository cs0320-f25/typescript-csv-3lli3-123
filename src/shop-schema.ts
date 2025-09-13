import { z } from "zod";

// a custom boolean schema that only accepts "true" or "false"
const StrictBoolean = z.string().refine(val =>
  ["true", "false"].includes(val.toLowerCase()),
  { message: "Expected 'true' or 'false'" }
).transform(val => val.toLowerCase() === "true");

// define a schema for a CSV row as an array of strings
export const ShopSchema = z
  .array(z.string())
  .refine(arr => arr.length === 4, { message: "Expected 4 elements" })
  .transform(arr => ({
    name: arr[0],
    weight: z.coerce.number().parse(arr[1]),
    transportable: StrictBoolean.parse(arr[2]),
    color: arr[3],   
  }));

type Item = z.infer<typeof ShopSchema>;