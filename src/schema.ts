import {z} from "zod";

// define a schema for a CSV with people
export const PersonSchema = z.tuple([z.string(), z.coerce.number()]).
transform( tup => ({name: tup[0], age: tup[1]}))

type Person = z.infer<typeof PersonSchema>;