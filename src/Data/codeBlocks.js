import CodeBlock from "../Models/codeBlockModel.js";

const populateDatabase = async () => {
  const codeBlocks = [
    {
      id: 1,
      title: "Loop Example",
      code: `// Print numbers from 1 to 5
for (let i = 1; i <= 5; i++) {
    // Complete the code to print the number
    console.log(i);
}`,
      solution: `for (let i = 1; i <= 5; i++) {
    console.log(i);
}`,
    },
    {
      id: 2,
      title: "Function Example",
      code: `// Create a function that returns the sum of two numbers
function addNumbers(a, b) {
    // Complete the function to return the sum of a and b
}`,
      solution: `function addNumbers(a, b) {
    return a + b;
}`,
    },
    {
      id: 3,
      title: "Async Example",
      code: `// Fetch data from an API and log the result
async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    // Log the title from the data
}`,
      solution: `async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    console.log(data.title);
}`,
    },
    {
      id: 4,
      title: "Array Example",
      code: `// Filter an array of numbers, keeping only numbers greater than 10
const numbers = [5, 12, 18, 1, 3];
const filtered = numbers.filter(number => {
    // Complete the condition to keep numbers greater than 10
});
console.log(filtered);`,
      solution: `const numbers = [5, 12, 18, 1, 3];
const filtered = numbers.filter(number => number > 10);
console.log(filtered);`,
    },
  ];

  try {
    await CodeBlock.insertMany(codeBlocks);
    console.log("Data inserted");
  } catch (err) {
    console.error("Error inserting data", err);
  }
};

const initializeDatabase = async () => {
  const count = await CodeBlock.countDocuments();
  if (count === 0) {
    console.log("Populating database with initial data...");
    populateDatabase();
  } else {
    console.log("Database already initialized.");
  }
};

export default initializeDatabase;
