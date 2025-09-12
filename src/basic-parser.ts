import * as fs from "fs";
import * as readline from "readline";

import {ZodSchema} from "zod";

/**
 * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
 * function for others to use. Most modern editors will show the comment when 
 * mousing over this function name. Try it in run-parser.ts!
 * 
 * File I/O in TypeScript is "asynchronous", meaning that we can't just
 * read the file and return its contents. You'll learn more about this 
 * in class. For now, just leave the "async" and "await" where they are. 
 * You shouldn't need to alter them.
 * 
 * @param path The path to the file being loaded.
 * @returns a "promise" to produce a 2-d array of cell values
 */
export async function parseCSV<T>(path: string, schema?: ZodSchema<T>): Promise<T[] | string[][]> {
  // This initial block of code reads from a file in Node.js. The "rl"
  // value can be iterated over in a "for" loop. 
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // handle different line endings
  });
  
  // if no schema is provided meaning undefined was passed in, just return arrays of strings
  if (!schema) {
  // Create an empty array of type T to hold the results
  const result: string[][] = [];
  
  // loop over each line in the file
  for await (const line of rl) {
    // split the line into values based on commas, and trim whitespace
    const values = line.split(",").map((v) => v.trim());
    result.push(values);
  }

  // return the 2-d array of strings
  return result;
}

// if a schema is provided, we will return parsed objects of type T
else {

  // Create an empty array of type T to hold the results
  const result: T[] = [];

  // initalize the header array to null
  let headers: string[] | null = null;
  
  // We add the "await" here because file I/O is asynchronous. 
  // We need to force TypeScript to _wait_ for a row before moving on. 
  // More on this in class soon!
  for await (const line of rl) {

    // obtain an array of values from the line
    const values = line.split(",").map((v) => v.trim());

    // if the line is the header, then set the headers variable
    if (!headers) {
      headers = values;

      // skip the rest of the loop for this iteration
      continue;
    }

    // add the parsed object to the result array, iff valid object
    try {
      // validate and transform the values array using the schema
      const parsed = schema.parse(values);
      result.push(parsed);
    } catch (e) {
      // if parsing fails, throw an error with details
      throw new Error(`Error parsing row: ${JSON.stringify(values)}. Details: ${(e as Error).message}`);
    }
  }
    return result
  }
}