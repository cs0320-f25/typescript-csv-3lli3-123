// test that the parser works with the person schema
import { PersonSchema } from "../src/person-schema";
import { FoodSchema } from "../src/food-schema";
import * as path from "path";
import { parseCSV } from "../src/basic-parser";

const HUMAN_CSV_PATH = path.join(__dirname, "../data/humans.csv");
const INCONSISTENT_DATATYPE_CSV_PATH = path .join(__dirname, "../data/different-datatype.csv");
const INCONSISTENT_COLUMNS_CSV_PATH = path.join(__dirname, "../data/inconsistent-columns.csv");

const FOOD_CSV_PATH = path.join(__dirname, "../data/food.csv");
const FAULTY_FOOD_CSV_PATH = path.join(__dirname, "../data/faulty-boolean-food.csv");

// since this csv has good format and 
// consistent data in each column, this should parse correctly
// and yield an array of objects with name and age properties
test("parseCSV with personschema yields objects", async () => {
  const results = await parseCSV(HUMAN_CSV_PATH, PersonSchema)
  
  expect(results).toHaveLength(4);
  expect(results[0]).toEqual({name: "Alice", age: 23});
  expect(results[1]).toEqual({name: "Bob", age: 30});
  expect(results[2]).toEqual({name: "Charlie", age: 25});
  expect(results[3]).toEqual({name: "Nim", age: 22});
});

// test that an error is thrown if the csv has inconsistent datatypes
test("parseCSV with personschema throws error on inconsistent datatypes", async () => {
  await expect(parseCSV(INCONSISTENT_DATATYPE_CSV_PATH, PersonSchema)).rejects.toThrow("Error parsing row");
});

// test that an error is thrown if the csv has rows with too many columns
test("parseCSV with personschema throws error on inconsistent columns", async () => {
  await expect(parseCSV(INCONSISTENT_COLUMNS_CSV_PATH, PersonSchema)).rejects.toThrow("Error parsing row");
});

// test that the food schema works correctly
test("parseCSV with foodschema yields objects", async () => {
  const results = await parseCSV(FOOD_CSV_PATH, FoodSchema)
  expect(results).toHaveLength(4);
  expect(results[0]).toEqual({name: "pasta", glutenfree: false, servings: 2});
  expect(results[1]).toEqual({name: "salad", glutenfree: true, servings: 1});
  expect(results[2]).toEqual({name: "bread", glutenfree: false, servings: 3});
  expect(results[3]).toEqual({name: "rice", glutenfree: true, servings: 4});
});

// test that an error is thrown if the food csv has non boolean values in the glutenfree column
test("parseCSV with foodschema throws error on faulty boolean", async () => {
  await expect(parseCSV(FAULTY_FOOD_CSV_PATH, FoodSchema)).rejects.toThrow("Error parsing row");
});