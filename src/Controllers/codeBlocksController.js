import CodeBlock from "../Models/codeBlockModel.js";

export const getCodeBlocks = async (req, res) => {
  try {
    console.log("Fetching codeBlocks");
    const codeBlocks = await CodeBlock.find();
    res.status(200).json(codeBlocks);
  } catch (error) {
    console.error("Error fetching codeBlocks:", error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching code blocks." });
  }
};
