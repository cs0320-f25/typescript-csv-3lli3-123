// test that the parser works with the person schema
import { PersonSchema } from "../src/person-schema";
import { FoodSchema } from "../src/food-schema";
import * as path from "path";
import { parseCSV } from "../src/basic-parser";
import { ShopSchema } from "../src/shop-schema";
import { RestaurantSchema } from "../src/restaurant-schema";

const HUMAN_CSV_PATH = path.join(__dirname, "../data/humans.csv");
const INCONSISTENT_DATATYPE_CSV_PATH = path .join(__dirname, "../data/different-datatype.csv");
const INCONSISTENT_COLUMNS_CSV_PATH = path.join(__dirname, "../data/inconsistent-columns.csv");

const FOOD_CSV_PATH = path.join(__dirname, "../data/food.csv");
const FAULTY_FOOD_CSV_PATH = path.join(__dirname, "../data/faulty-boolean-food.csv");

const SHOP_CSV_PATH = path.join(__dirname, "../data/shop.csv");
const FAULTY_COLOR_SHOP_CSV_PATH = path.join(__dirname, "../data/faulty-color-shop.csv");

const RESTAURANT_CSV_PATH = path.join(__dirname, "../data/restaurant.csv");
const FAULTY_AVPRICE_RESTAURANT_CSV_PATH = path.join(__dirname, "../data/faulty-avprice-restaurant.csv");

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

// test that the shop schema works correctly
test("parseCSV with shopschema yields objects", async () => {
  const results = await parseCSV(SHOP_CSV_PATH, ShopSchema)
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual({name: "lamp", weight: 5, transportable: true, color: "gold"});
  expect(results[1]).toEqual({name: "desk", weight: 10, transportable: false, color: "brown"});
  expect(results[2]).toEqual({name: "chair", weight: 7, transportable: true, color: "pink"});
});

// test that an error is thrown if the shop csv has a non string value in the color column
test("parseCSV with shopschema throws error on faulty color", async () => {
  await expect(parseCSV(FAULTY_COLOR_SHOP_CSV_PATH, FoodSchema)).rejects.toThrow("Error parsing row");
});

// test that the restaurant schema works correctly
test("parseCSV with restaurantschema yields objects", async () => {
  const results = await parseCSV(RESTAURANT_CSV_PATH, RestaurantSchema) 
  expect(results).toHaveLength(4);
  expect(results[0]).toEqual({capacity: 100, cuisine: "greek", employees: 20, name: "milos", averageprice: 30.5});
  expect(results[1]).toEqual({capacity: 200, cuisine: "italian", employees: 50, name: "maggianos", averageprice: 22.25});
  expect(results[2]).toEqual({capacity: 150, cuisine: "thai", employees: 30, name: "heng", averageprice: 24.5});
  expect(results[3]).toEqual({capacity: 50, cuisine: "american", employees: 5, name: "mycafe", averageprice: 8.5});
});

// test that an error is thrown if the restaurant csv has a non number value in the averageprice column
test("parseCSV with restaurantschema throws error on faulty avprice", async () => {
  await expect(parseCSV(FAULTY_AVPRICE_RESTAURANT_CSV_PATH, RestaurantSchema)).rejects.toThrow("Error parsing row");
}); 