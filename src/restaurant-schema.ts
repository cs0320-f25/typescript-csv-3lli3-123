import { z } from "zod";

// define a schema for a CSV row as an array of strings
export const RestaurantSchema = z
  .array(z.string())
  .refine(arr => arr.length === 5, { message: "Expected 5 elements" })
  .transform(arr => ({
    capacity: z.coerce.number().parse(arr[0]),
    cuisine: arr[1],
    employees: z.coerce.number().parse(arr[2]),
    name: arr[3],
    averageprice: z.coerce.number().parse(arr[4]),
  }));

type Restaurant = z.infer<typeof RestaurantSchema>;