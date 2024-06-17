import codeBlocks from "../Data/codeBlocks.js";

export const getCodeBlocks = (req, res) => {
  try {
    console.log("Fetching codeBlocks");
    res.status(200).send(codeBlocks);
  } catch (error) {
    console.error("Error fetching codeBlocks:", error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching code blocks." });
  }
};
