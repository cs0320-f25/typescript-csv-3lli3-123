import { z } from "zod";

// a custom boolean schema that only accepts "true" or "false"
const StrictBoolean = z.string().refine(val =>
  ["true", "false"].includes(val.toLowerCase()),
  { message: "Expected 'true' or 'false'" }
).transform(val => val.toLowerCase() === "true");

// define a schema for a CSV row as an array of strings
export const FoodSchema = z
  .array(z.string())
  .refine(arr => arr.length === 3, { message: "Expected 3 elements" })
  .transform(arr => ({
    name: arr[0],
    glutenfree: StrictBoolean.parse(arr[1]),
    servings: z.coerce.number().parse(arr[2]),   
  }));

type Food = z.infer<typeof FoodSchema>;