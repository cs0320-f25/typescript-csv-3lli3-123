import { parseCSV } from "../src/basic-parser";
import { PersonSchema } from "../src/schema";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const EMPTY_CSV_PATH = path.join(__dirname, "../data/empty.csv");
const HEADERS_ONLY_CSV_PATH = path.join(__dirname, "../data/headers-only.csv");
const INCONSISTENT_COLUMNS_CSV_PATH = path.join(__dirname, "../data/inconsistent-columns.csv");
const SEMICOLON_CSV_PATH = path.join(__dirname, "../data/semicolon-delimiter.csv");
const DIFFERENT_DATATYPE_CSV_PATH = path.join(__dirname, "../data/different-datatype.csv");
const BLANK_ROW_CSV_PATH = path.join(__dirname, "../data/blank-row.csv");
const SPACED_OUT_CSV_PATH = path.join(__dirname, "../data/spaced-out-csv"); 

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, PersonSchema)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, PersonSchema)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

// test parser on an empty csv file, which should throw an error
// to alert the user that the file is empty
test ("parseCSV on empty csv throws error", async () => {
  await expect(parseCSV(EMPTY_CSV_PATH, PersonSchema)).rejects.toThrow("Error parsing row");
});

// test parser on an empty csv file which should throw an error
// to alert the user that the file is empty
test ("parseCSV on headers only csv throws error", async () => {
  await expect(parseCSV(HEADERS_ONLY_CSV_PATH, PersonSchema)).rejects.toThrow("Error parsing row");
});

// test parser on a csv with inconsistent columns
// we expect an error to be thrown when parsing due to inconsitent columns
test ("parseCSV on rows with different columns throws error on inconsistent columns", async () => {
  await expect(parseCSV(INCONSISTENT_COLUMNS_CSV_PATH, PersonSchema)).rejects.toThrow("Error parsing row");
});

// test parser on csv with columns with different datatypes,
// this should throw an error since we want all data in a column to be of the same type
test ("parseCSV on rows with different datatypes throws error on inconsistent datatypes", async () => {
  await expect(parseCSV(DIFFERENT_DATATYPE_CSV_PATH, PersonSchema)).rejects.toThrow("Error parsing row");
});

// test parser with different delimiters like semicolons, this should still parse
test ("parseCSV on semicolon delimited csv still parses", async () => {
 const group = await parseCSV(SEMICOLON_CSV_PATH, PersonSchema)
  
  expect(group).toHaveLength(5);
  expect(group[0]).toEqual(["name", "age"]);
  expect(group[1]).toEqual(["Alice", "23"]);
  expect(group[2]).toEqual(["Bob", "30"]);
  expect(group[3]).toEqual(["Charlie", "25"]);
  expect(group[4]).toEqual(["Nim", "22"]);
});

// test parser with empty rows in between data rows, this shouldn't work since we don't
// want empty arrays 
test ("parseCSV on csv with blank rows doesn't parse", async () => {
   await expect(parseCSV(BLANK_ROW_CSV_PATH, PersonSchema)).rejects.toThrow("Error parsing row");
});

// test parser with a space before the comma, this should still parse correctly
test ("parseCSV on spaced out csv still parses", async () => {
 const clique = await parseCSV(SPACED_OUT_CSV_PATH, PersonSchema)
  
  expect(clique).toHaveLength(5);
  expect(clique[0]).toEqual(["name", "age"]);
  expect(clique[1]).toEqual(["Alice", "23"]);
  expect(clique[2]).toEqual(["Bob", "30"]);
  expect(clique[3]).toEqual(["Charlie", "25"]);
  expect(clique[4]).toEqual(["Nim", "22"]);
});
