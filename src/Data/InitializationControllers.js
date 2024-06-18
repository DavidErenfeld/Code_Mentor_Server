import CodeBlock from "../Models/codeBlockModel.js";
import codeBlocks from "./codeBlockArray.js";

const clearDatabase = async () => {
  try {
    await CodeBlock.deleteMany({});
    console.log("All data deleted from database.");
  } catch (err) {
    console.error("Error deleting data", err);
    throw new Error("Failed to clear database");
  }
};

const populateDatabase = async () => {
  try {
    await CodeBlock.insertMany(codeBlocks);
    console.log("Data inserted");
  } catch (err) {
    console.error("Error inserting data", err);
    throw new Error("Failed to populate database");
  }
};

const initializeDatabase = async () => {
  try {
    await clearDatabase();
    await populateDatabase();
  } catch (error) {
    console.error("Initialization failed:", error.message);
  }
};

export default initializeDatabase;
