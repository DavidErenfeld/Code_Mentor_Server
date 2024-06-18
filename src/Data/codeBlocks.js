const codeBlocks = [
  {
    id: 1,
    title: "Loop Example",
    code: `//Complete the loop to print 'Even' for even numbers and 'Odd' for odd numbers.
    
for (let i = 0; i < 5; i++) { 
    if (i % 2 === 0) {
      // Complete here
    } else {
      // Complete here
    }
}`,
    solution: `for (let i = 0; i < 5; i++) { 
  if (i % 2 === 0) {
    console.log(\`Even: \${i}\`);
  } else {
    console.log(\`Odd: \${i}\`);
  }
}`,
  },
  {
    id: 2,
    title: "Function Example",
    code: `//Complete the function to print 'Hello, {name}!' when a name is provided and 'Hello, World!' when no name is given.
   
function greet(name) {
  if (name) {
    // Complete here
  } else {
    // Complete here
  }
}

greet("Alice");
greet();`,
    solution: `function greet(name) {
  if (name) {
    console.log(\`Hello, \${name}!\`);
  } else {
    console.log("Hello, World!");
  }
}

greet("Alice");
greet();


`,
  },
  {
    id: 3,
    title: "Async Example",
    code: `//Complete the function to make a request to the URL and fetch the data.

async function fetchData() {
      try {
          let response = await fetch('https://api.example.com/data');
          if (!response.ok) {
      throw new Error('Network response was not ok');
    }
      // Complete here
    } catch (error) {
      console.error('Fetch error:', error);
    }
}

fetchData();`,
    solution: `async function fetchData() {
  try {
    let response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

fetchData();`,
  },
  {
    id: 4,
    title: "Array Example",
    code: `//"Complete the code to convert the fruits to uppercase, filter fruits starting with 'A' or 'B', and print them.
   
const fruits = ["apple", "banana", "cherry"];
    fruits.map(fruit => fruit.toUpperCase())
        .filter(fruit => // Complete here)
        .forEach(fruit => console.log(fruit));`,
    solution: `const fruits = ["apple", "banana", "cherry"];
fruits.map(fruit => fruit.toUpperCase())
      .filter(fruit => fruit.startsWith('A') || fruit.startsWith('B'))
      .forEach(fruit => console.log(fruit));`,
  },
];

export default codeBlocks;
